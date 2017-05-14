import { INITIAL_STATE, PayloadAction } from '../';
import { PlayersActions, Player } from './';

export const players = (state: Player[] = [], action: PayloadAction): Player[] => {
    switch (action.type) {
        case PlayersActions.PLAYERS_UPDATE: return action.payload.players || state;
    }
    return state;
};
