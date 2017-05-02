const socketio = require('socket.io')
const uuid = require('uuid');
const Player = require('./player');
const Bullet = require('./bullet');

class GameServer {
    static get EVENT_CONNECTION() { return 'connection'; }
    static get EVENT_DISCONNECT() { return 'disconnect'; }
    static get EVENT_KEYPRESS() { return 'keyPress'; }
    static get EVENT_MOUSEMOVE() { return 'mouseMove'; }
    static get EVENT_MOUSECLICK() { return 'mouseClick'; }
    static get EVENT_GAMEUPDATE() { return 'gameUpdate'; }
    static get GAME_LOOP_DELTA() { return 1000/60; } // 60 updates per second
    static angleBetween(p1, p2) {
        return Math.atan2(p2.y - p1.y, p2.x - p1.x);
    }

    constructor(server) {
        this.clients = {};
        this.bullets = {};
        this.io = socketio(server, {});
        this.io.on(GameServer.EVENT_CONNECTION, (socket) => {
            this.onConnection(socket);
        })

        this.isRunning = false;
        this.gameLoopSubscription = undefined;
    }

    onConnection(socket) {
        console.log(`New connection from address: ${socket.conn.remoteAddress}`)
        const player = this.createPlayer(socket);
        this.playerEvents(socket, player);
        this.registerPlayer(socket, player);
    }

    playerEvents(socket, player) {
        socket.on(GameServer.EVENT_MOUSECLICK, () => {
            const angle = GameServer.angleBetween(player.position, player.mousePosition);
            const bullet = new Bullet({id: uuid(), sourceId: player.id, angle})
            bullet.kinematics.setPosition(player.kinematics);
            this.registerBullet(bullet);
        })

        socket.on(GameServer.EVENT_KEYPRESS, (event) => {
            if (this.isRunning) {
                player.updateInput(event);
            }
        });

        socket.on(GameServer.EVENT_MOUSEMOVE, (event) => {
            player.mouseMove(event.position);
        })

        socket.on(GameServer.EVENT_DISCONNECT, this.disconnectPlayer(player.id));
    }

    createPlayer(socket) {
        const id = uuid();
        console.log(`Creating player with id: ${id}`); // todo: to debug

        return new Player(id);
    }

    registerPlayer(socket, player) {
        console.log(`Connecting player ${player.id}`)
        this.clients[player.id] = { socket, player };
    }

    registerBullet(bullet) {
        bullet.on(Bullet.EVENT_EXPIRE, () => {
            delete this.bullets[bullet.id]
        })
        this.bullets[bullet.id] = bullet;
    }

    disconnectPlayer(id) {
        return () => {
            console.log(`Disconnecting player ${id}`); // todo: to debug
            delete this.clients[id];
        }
    }

    gameLoop() {
        const players = Object.values(this.clients).map(({player}) => {
            player.update();
            player.kinematics.clampPosition({
                width: 500,
                height: 500
            });
            return player.data();
        });

        const bullets = Object.values(this.bullets).map(bullet => {
            bullet.update();
            return bullet.data();
        });

        const allUpdates = { players, bullets };

        Object.values(this.clients).forEach(({socket, player}) => {
            const update = Object.assign({mousePosition: player.mousePosition}, allUpdates);
            socket.emit(GameServer.EVENT_GAMEUPDATE, update);
        });
    }

    run() {
        console.log('Starting game server!')
        this.gameLoopSubscription = 
            setInterval(() => { this.gameLoop(); },
                        GameServer.GAME_LOOP_DELTA); 
        this.isRunning = true;
    }

    stop() {
        console.log('Stopping game server!');
        clearInterval(this.gameLoopSubscription);
        this.isRunning = false;
    }
}

module.exports = GameServer;