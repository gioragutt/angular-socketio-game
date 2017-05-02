const EventEmitter = require('events').EventEmitter;

class Input extends EventEmitter {
    static get INPUTS() { return ['left', 'right', 'up', 'down', 'space'] }; 
    static get DEFAULT_INPUT_STATE() { return false };
    static pressEventName(input) { return `${input}Pressed`; }

    constructor() {
        super();

        const defaultInputState = Input.DEFAULT_INPUT_STATE;
        this.left = defaultInputState;
        this.right = defaultInputState;
        this.up = defaultInputState;
        this.down = defaultInputState;
        this.space = defaultInputState;

        this.mousePosition = {
            x: 0,
            y: 0
        };
    }

    mouseMove({x, y}) {
        this.mousePosition = {x, y};
    }

    updateInput({input, state}) {
        if (Input.INPUTS.indexOf(input) < 0) {
            console.error(`${input} is not stated in the INPUTS array`); // todo: chulk
        }

        const shouldUpdate = state && !this[input];
        this[input] = state;

        if (shouldUpdate) {
            this.emit(Input.pressEventName(input));
        }
    }

    toString() {
        return `[left: ${this.left}, right: ${this.right}, up: ${this.up}, down: ${this.down}, space: ${this.space}]`;
    }
}

module.exports = Input;