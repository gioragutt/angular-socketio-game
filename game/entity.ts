const Kinematics = require('./kinematics');
const EventEmitter = require('events').EventEmitter;

class Entity extends EventEmitter {
    constructor({id, kinematics = new Kinematics(), sourceId = ''}) {
        super();
        
        this.kinematics = kinematics;
        this.id = id;
        this.sourceId = sourceId;
    }

    data() {
        return {
            x: this.kinematics.x,
            y: this.kinematics.y,
            id: this.id
        };
    }

    update() {
        // would be abstract or interfaced in TS
    }
}

module.exports = Entity;