export class Kinematics {
    x = 0;
    y = 0;

    static clamp(min, max, value) {
        return value < min ? min :
               value > max ? max :
               value;
    }

    constructor(public speedX = 10, public speedY = 10) { }

    updatePositionByInput(input: any) {
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

    setPosition({x, y}) {
        this.x = x;
        this.y = y;
    }

    clampPosition({width, height}) {
        this.x = Kinematics.clamp(0, width, this.x);
        this.y = Kinematics.clamp(0, height, this.y);
    }

    updatePosition() {
        // console.log(`Update position called without input`)
        this.y += this.speedY;
        this.x += this.speedX;
    }
}
