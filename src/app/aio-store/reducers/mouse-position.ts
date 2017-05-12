import { PayloadAction } from '../action';
import { MousePositionActions } from '../actions';
import { INITIAL_STATE, Position } from '../model';

export const mousePosition = (state: Position = INITIAL_STATE.mousePosition, action: PayloadAction): Position => {
    switch (action.type) {
        case MousePositionActions.MOUSE_POSITION_UPDATE: return action.payload.mousePosition;
    }
    return state;
};
