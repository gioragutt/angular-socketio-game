import { Position } from './index';

export class MathMethods {
    static clamp(min: number, max: number, value: number): number {
        return value < min ? min :
               value > max ? max :
               value;
    };

    static angleBetween(p1: Position, p2: Position): number {
        return Math.atan2(p2.y - p1.y, p2.x - p1.x);
    };
};