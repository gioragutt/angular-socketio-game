const Input = require('./input');
const Entity = require('./entity');

class Player extends Entity {
    static get EVENT_UPDATE_INPUT() { return 'updateInput' };
    static get EVENT_FIRE_BULLET() { return 'fireBullet'; }
    static get EVENT_INPUT_SPACEPRESSED() { return 'spacePressed'; }

    constructor(id) {
        super({id});
        this.input = new Input();
        console.log(`initializing player with id: ${id}`) // todo: to debug

        this.input.on(Player.EVENT_INPUT_SPACEPRESSED, () => {
            this.emit(Player.EVENT_FIRE_BULLET);
            console.log(`Player ${this.id} fired a bullet`)
        })

        this.on(Player.EVENT_UPDATE_INPUT, ({input, state}) => {
            const event = {input, state};
            this.input.updateInput({input, state});
        })
    }

    updateInput({input, state}) {
        this.input.updateInput({input, state});
    }

    mouseMove({x, y}) {
        this.input.mouseMove({x, y});
    }

    update() {
        super.update()
        this.kinematics.updatePositionByInput(this.input);
    }

    get position() {
        return {
            x: this.kinematics.x,
            y: this.kinematics.y
        }
    }

    get mousePosition() {
        return this.input.mousePosition;
    }

    // data() {
    //     return Object.assign({ mousePosition: this.input.mousePosition }, super.data());
    // }
}

module.exports = Player;