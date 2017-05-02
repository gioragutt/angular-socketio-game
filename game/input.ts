import { EventEmitter } from 'events';
import { Position } from './kinematics';

export class Input extends EventEmitter {
    static INPUTS = ['left', 'right', 'up', 'down', 'space'];
    static DEFAULT_INPUT_STATE = false;
    static DEFAULT_MOUSE_POSITION: Position = { x: 0, y: 0 };

    left = Input.DEFAULT_INPUT_STATE;
    right = Input.DEFAULT_INPUT_STATE;
    up = Input.DEFAULT_INPUT_STATE;
    down = Input.DEFAULT_INPUT_STATE;
    space = Input.DEFAULT_INPUT_STATE;
    mousePosition = Input.DEFAULT_MOUSE_POSITION;

    constructor() {
        super();
    }

    mouseMove(mousePosition: Position): void {
        this.mousePosition = mousePosition;
    }

    updateInput(input: string, state: boolean): void {
        if (Input.INPUTS.indexOf(input) < 0) {
            console.error(`${input} is not stated in the INPUTS array`); // todo: chulk
        }

        const shouldUpdate = state && !this[input];
        this[input] = state;

        if (shouldUpdate) {
            this.emit(`${input}Pressed`);
        }
    }

    toString(): string {
        return `[left: ${this.left}, right: ${this.right}, up: ${this.up}, down: ${this.down}, space: ${this.space}]`;
    }
}