import { Position, PayloadAction } from '../';
import { MousePositionActions } from './';

export const mousePosition = (state: Position = {x: 0, y: 0}, action: PayloadAction): Position => {
    switch (action.type) {
        case MousePositionActions.MOUSE_POSITION_UPDATE: return action.payload.mousePosition;
    }
    return state;
};
