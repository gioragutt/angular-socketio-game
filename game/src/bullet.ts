import { Kinematics, Entity } from './entity';

export class Bullet extends Entity {
    static EVENT_UPDATE = 'update';
    static EVENT_EXPIRE = 'expire';

    lifespan = 100;
    elapsedLifespan = 0;

    static angularKinematics(angleInRadians: number): Kinematics {
        const speedX = Math.cos(angleInRadians) * 10;
        const speedY = Math.sin(angleInRadians) * 10;
        return new Kinematics(speedX, speedY);
    }

    constructor(id: string, angle: number, sourceId: string) {
        super(id, Bullet.angularKinematics(angle), sourceId);
    }

    update(): void {
        this.elapsedLifespan++;

        if (this.elapsedLifespan >= this.lifespan) {
            this.emit(Bullet.EVENT_EXPIRE);
            return;
        }
        this.kinematics.updatePosition();
    }
}
