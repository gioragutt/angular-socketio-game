import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../model';

@Injectable()
export class IdActions {
  static ID_ASSIGN = 'ID_ASSIGN';

  constructor(private store: NgRedux<AppState>) { }

  assignId(id: string) {
    this.store.dispatch({
      type: IdActions.ID_ASSIGN,
      payload: {
        id
      }
    });
  }

}
