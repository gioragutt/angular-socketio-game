import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../model';
import { Bullet } from './';

@Injectable()
export class BulletsActions {
  static BULLETS_UPDATE = 'BULLETS_UPDATE';

  constructor(private store: NgRedux<AppState>) { }

  updateBullets(bullets: Bullet[]) {
    this.store.dispatch({
      type: BulletsActions.BULLETS_UPDATE,
      payload: {
        bullets
      }
    });
  }

}
