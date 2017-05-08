import { Player, INITIAL_STATE } from '../model';
import { PayloadAction } from '../action';
import { PlayersActions } from '../actions';

export const players = (state: Player[] = INITIAL_STATE.players, action: PayloadAction): Player[] => {
    switch (action.type) {
        case PlayersActions.PLAYERS_UPDATE: return action.payload.players || state;
    }
    return state;
};
