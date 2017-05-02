import { MathMethods } from './index';

export interface Position {
    x: number;
    y: number;
}

export interface Dimention {
    width: number;
    height: number;
}

export class Kinematics {
    x = 0;
    y = 0;

    constructor(public speedX = 10, public speedY = 10) { }

    updatePositionByInput(input: any): void {
        if (input.up) {
            this.y -= this.speedY;
        }
        if (input.down) {
            this.y += this.speedY;
        }
        if (input.left) {
            this.x -= this.speedX;
        }
        if (input.right) {
            this.x += this.speedX;
        }
    }

    setPosition(position: Position): void {
        this.x = position.x;
        this.y = position.y;
    }

    clampPosition(dimention: Dimention): void {
        this.x = MathMethods.clamp(0, dimention.width, this.x);
        this.y = MathMethods.clamp(0, dimention.height, this.y);
    }

    updatePosition(): void {
        this.y += this.speedY;
        this.x += this.speedX;
    }
}
