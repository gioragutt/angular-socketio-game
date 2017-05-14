import { PayloadAction } from '../';
import { Bullet, BulletsActions } from './';

export const bullets = (state: Bullet[] = [], action: PayloadAction): Bullet[] => {
    switch (action.type) {
        case BulletsActions.BULLETS_UPDATE: return action.payload.bullets || state;
    }
    return state;
};
