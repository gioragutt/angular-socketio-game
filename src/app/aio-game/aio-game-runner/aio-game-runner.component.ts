import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AioServerConnectionService, EventArgs } from '../../aio-server-connection';
import { GameInputDisableService } from '../../shared';
import { ServerUpdate, select, AppState, AioGameUpdatesService } from '../../aio-store';

export const appStateToGameData = (state: AppState): ServerUpdate => {
  const { players, bullets, mousePosition } = state;
  return { players, bullets, mousePosition };
};

@Component({
  selector: 'aio-game-runner',
  templateUrl: './aio-game-runner.component.html',
  styleUrls: ['./aio-game-runner.component.scss']
})
export class AioGameRunnerComponent {

  @select(appStateToGameData) gameUpdate$: Observable<ServerUpdate>;

  constructor(private server: AioServerConnectionService,
              public gameInput: GameInputDisableService,
              private updates: AioGameUpdatesService) { }

  emitToServer(args: EventArgs) {
    this.server.emit(args);
  }
}
