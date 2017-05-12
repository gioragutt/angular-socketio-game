import { PayloadAction } from '../action';
import { IdActions } from '../actions';
import { INITIAL_STATE } from '../model';

export const id = (state: string = INITIAL_STATE.id, action: PayloadAction): string => {
    switch (action.type) {
        case IdActions.ID_UPDATE: return action.payload.id;
    }
    return state;
};
