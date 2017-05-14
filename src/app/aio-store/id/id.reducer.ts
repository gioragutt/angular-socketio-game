import { PayloadAction } from '../';
import { IdActions } from './';

export const id = (state: string = '', action: PayloadAction): string => {
    switch (action.type) {
        case IdActions.ID_UPDATE: return action.payload.id;
    }
    return state;
};
