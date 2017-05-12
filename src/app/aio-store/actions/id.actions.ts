import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../model';

@Injectable()
export class IdActions {
  static ID_UPDATE = 'ID_UPDATE';

  constructor(private store: NgRedux<AppState>) { }

  updateId(id: string) {
    this.store.dispatch({
      type: IdActions.ID_UPDATE,
      payload: {
        id
      }
    });
  }

}
