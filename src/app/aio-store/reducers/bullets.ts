import { Bullet, INITIAL_STATE } from '../model';
import { PayloadAction } from '../action';
import { BulletsActions } from '../actions';

export const bullets = (state: Bullet[] = INITIAL_STATE.bullets, action: PayloadAction): Bullet[] => {
    switch (action.type) {
        case BulletsActions.BULLETS_UPDATE: return action.payload.bullets || state;
    }
    return state;
};
