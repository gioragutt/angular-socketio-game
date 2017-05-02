import { Input, InputData } from './input';
import { Entity } from './entity';
import { Position } from './kinematics';

export class Player extends Entity {
    static EVENT_UPDATE_INPUT = 'updateInput';
    static EVENT_FIRE_BULLET = 'fireBullet';
    static EVENT_INPUT_SPACEPRESSED = 'spacePressed';

    input = new Input();

    constructor(id: string) {
        super(id);
        console.log(`initializing player with id: ${id}`); // todo: to debug

        this.input.on(Player.EVENT_INPUT_SPACEPRESSED, () => {
            this.emit(Player.EVENT_FIRE_BULLET);
        });

        this.on(Player.EVENT_UPDATE_INPUT, ({ input, state }: InputData) => {
            this.updateInput({ input, state });
        });
    }

    updateInput(inputData: InputData): void {
        this.input.updateInput(inputData);
    }

    mouseMove(position: Position): void {
        this.input.mouseMove(position);
    }

    update(): void {
        this.kinematics.updatePositionByInput(this.input);
    }

    get position(): Position {
        return {
            x: this.kinematics.x,
            y: this.kinematics.y
        };
    }

    get mousePosition(): Position {
        return this.input.mousePosition;
    }
}
