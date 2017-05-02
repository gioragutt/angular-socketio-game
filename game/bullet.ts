const Entity = require('./entity');
const Kinematics = require('./kinematics');

class Bullet extends Entity {
    static get EVENT_UPDATE() { return 'update'; }
    static get EVENT_EXPIRE() { return 'expire'; }

    static angularKinematics(angleInRadians) {
        const speedX = Math.cos(angleInRadians) * 10
        const speedY = Math.sin(angleInRadians) * 10
        return new Kinematics(speedX, speedY);
    }

    constructor({id, angle, sourceId}) {
        super({
            id,
            kinematics: Bullet.angularKinematics(angle),
            sourceId
        });
        
        this.lifespan = 100;
        this.elapsedLifespan = 0;
    }

    update() {
        super.update();
        this.elapsedLifespan++;

        if (this.elapsedLifespan >= this.lifespan) {
            this.emit(Bullet.EVENT_EXPIRE);
            return;
        }
        this.kinematics.updatePosition();
    }
}

module.exports = Bullet;