import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState, Player } from '../model';

@Injectable()
export class PlayersActions {
  static PLAYERS_UPDATE = 'PLAYERS_UPDATE';

  constructor(private store: NgRedux<AppState>) { }

  updatePlayers(players: Player[]) {
    this.store.dispatch({
      type: PlayersActions.PLAYERS_UPDATE,
      payload: {
        players
      }
    });
  }

}
