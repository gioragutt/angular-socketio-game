class Kinematics {
    static clamp(min, max, value) {
        return value < min ? min :
               value > max ? max :
               value;
    }

    constructor(speedX = 10, speedY = 10) {
        this.x = 0;
        this.y = 0;
        this.speedX = speedX;
        this.speedY = speedY;
    }

    updatePositionByInput(input) {
        // console.log(`Update position called with input ${input}`)
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

module.exports = Kinematics;