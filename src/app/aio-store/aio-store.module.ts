import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { combineReducers } from 'redux';
import * as actions from './actions';

import { AioGameUpdatesService } from './aio-game-updates.service';
import { AppState, INITIAL_STATE } from './model';
import { id, players, bullets, chatMessages, mousePosition } from './reducers';

const rootReducer = combineReducers<AppState>({
  id,
  players,
  bullets,
  chatMessages,
  mousePosition
});

@NgModule({
  imports: [
    CommonModule,
    NgReduxModule
  ],
  exports: [
    NgReduxModule
  ],
  declarations: []
})
export class AioStoreModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AioStoreModule,
      providers: [
        actions.BulletsActions,
        actions.ChatMessagesActions,
        actions.IdActions,
        actions.PlayersActions,
        actions.MousePositionActions,
        AioGameUpdatesService
      ]
    };
  };

  constructor(ngRedux: NgRedux<AppState>) {
    ngRedux.configureStore(rootReducer, INITIAL_STATE);
  }
}
