import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { combineReducers } from 'redux';

import {
  AioGameUpdatesService,
  AppState, INITIAL_STATE,
  id, players, bullets, chatMessages, mousePosition,
  BulletsActions, ChatMessagesActions, IdActions, PlayersActions, MousePositionActions
} from './';

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
        BulletsActions,
        ChatMessagesActions,
        IdActions,
        PlayersActions,
        MousePositionActions,
        AioGameUpdatesService
      ]
    };
  };

  constructor(ngRedux: NgRedux<AppState>) {
    ngRedux.configureStore(rootReducer, INITIAL_STATE);
  }
}
