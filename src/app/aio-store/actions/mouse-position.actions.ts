import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState, Position } from '../model';

@Injectable()
export class MousePositionActions {
  static MOUSE_POSITION_UPDATE = 'MOUSE_POSITION_UPDATE';

  constructor(private store: NgRedux<AppState>) { }

  updateMousePosition(mousePosition: Position) {
    this.store.dispatch({
      type: MousePositionActions.MOUSE_POSITION_UPDATE,
      payload: {
        mousePosition
      }
    });
  }

}
