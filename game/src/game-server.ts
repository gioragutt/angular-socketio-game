import * as socketIo from 'socket.io';
import * as uuid from 'uuid';
import { Server } from 'http';
import { Player, Bullet, Position, InputData, MathMethods } from './index';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/defer';
import 'rxjs/add/observable/interval';

export interface IdMap<T> {
     [id: string]: T;
};

export interface Client {
    socket: SocketIO.Socket;
    player: Player;
}

export class GameServer {
    static EVENT_CONNECTION = 'connection';
    static EVENT_DISCONNECT = 'disconnect';
    static EVENT_KEYPRESS = 'keyPress';
    static EVENT_MOUSEMOVE = 'mouseMove';
    static EVENT_MOUSECLICK = 'mouseClick';
    static EVENT_GAMEUPDATE = 'gameUpdate';
    static EVENT_MESSAGE = 'message';
    static EVENT_INITIALGAMEDATA = 'initialGameData';

    static UPDATES_PER_SECOND = 60;
    static GAME_LOOP_DELTA = 1000 / GameServer.UPDATES_PER_SECOND;

    clients: IdMap<Client> = {};
    bullets: IdMap<Bullet> = {};
    io: SocketIO.Server;
    isRunning = false;
    gameLoopSubscription: Subscription;

    constructor(server: Server) {
        this.io = socketIo(server);
        this.io.on(GameServer.EVENT_CONNECTION, (socket: SocketIO.Socket, callback?: any) => {
            this.onConnection(socket);
        });
    }

    onConnection(socket: SocketIO.Socket) {
        console.log(`New connection from address: ${socket.conn.remoteAddress}`);
        const player = this.createPlayer();
        this.playerEvents(socket, player);
        this.registerPlayer(socket, player);
        socket.emit(GameServer.EVENT_INITIALGAMEDATA, {
            id: player.id
        });
    }

    playerEvents(socket: SocketIO.Socket, player: Player): void {
        socket.on(GameServer.EVENT_MOUSECLICK, () => {
            const angle = MathMethods.angleBetween(player.position, player.mousePosition);
            const bullet = new Bullet(uuid(), angle, player.id);
            bullet.kinematics.setPosition(player.kinematics);
            this.registerBullet(bullet);
        });

        socket.on(GameServer.EVENT_KEYPRESS, (event: InputData) => {
            if (this.isRunning) {
                player.updateInput(event);
            }
        });

        socket.on(GameServer.EVENT_MOUSEMOVE, (event: { position: Position }) => {
            player.mouseMove(event.position);
        });

        socket.on(GameServer.EVENT_DISCONNECT, this.disconnectPlayer(player.id));
        socket.on(GameServer.EVENT_MESSAGE, (message) => {
            this.io.emit('message', {
                source: player.id,
                message
            });
        });
    }

    createPlayer(): Player {
        const id = uuid();
        console.log(`Creating player with id: ${id}`); // todo: to debug
        return new Player(id);
    }

    registerPlayer(socket: SocketIO.Socket, player: Player): void {
        console.log(`Connecting player ${player.id}`);
        this.clients[player.id] = { socket, player };
    }

    registerBullet(bullet: Bullet): void {
        bullet.on(Bullet.EVENT_EXPIRE, () => {
            delete this.bullets[bullet.id];
        });
        this.bullets[bullet.id] = bullet;
    }

    disconnectPlayer(id: string): () => void {
        return () => {
            console.log(`Disconnecting player ${id}`); // todo: to debug
            delete this.clients[id];
        };
    }

    gameLoop(): void {
        const players = Object.values(this.clients).map(({player}: Client) => {
            player.update();
            player.kinematics.clampPosition({
                width: 500,
                height: 500
            });
            return player.data();
        });

        const bullets = Object.values(this.bullets).map((bullet: Bullet) => {
            bullet.update();
            return bullet.data();
        });

        const allUpdates = { players, bullets };

        Object.values(this.clients).forEach(({socket, player}: Client) => {
            const update = Object.assign({mousePosition: player.mousePosition}, allUpdates);
            socket.emit(GameServer.EVENT_GAMEUPDATE, update);
        });
    }

    run(): void {
        console.log('Starting game server!');
        this.gameLoopSubscription =
            Observable.defer(() => {
                this.isRunning = true;
                return Observable.interval(GameServer.GAME_LOOP_DELTA);
            }).subscribe(
                (elapsed: number) => this.gameLoop(),
                (error: any) => console.log(error),
                () => { this.isRunning = false; });
    }

    stop(): void {
        this.gameLoopSubscription.unsubscribe();
    }
}
