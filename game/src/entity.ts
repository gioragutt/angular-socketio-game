import { Kinematics } from './kinematics';
export { Kinematics } from './kinematics';
import { EventEmitter } from 'events';

export abstract class Entity extends EventEmitter {

    constructor(public id: string,
                public kinematics = new Kinematics(),
                public sourceId = '') {
        super();
    }

    data(): any {
        return {
            x: this.kinematics.x,
            y: this.kinematics.y,
            id: this.id
        };
    }

    abstract update(): void;
}
