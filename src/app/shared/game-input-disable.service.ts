import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class GameInputDisableService {
  private _shouldDisable$ = new BehaviorSubject<boolean>(false);

  shouldDisable(): Observable<boolean> {
    return this._shouldDisable$.asObservable();
  }

  enableInput() {
    this.setShouldDisable(false);
  }

  disableInput() {
    this.setShouldDisable(true);
  }

  private setShouldDisable(disable: boolean) {
    this._shouldDisable$.next(disable);
  }
}
