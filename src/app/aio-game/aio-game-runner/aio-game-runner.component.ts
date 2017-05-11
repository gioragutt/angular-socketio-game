import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AioServerConnectionService, ServerEvent, EventArgs, ConnectionData } from '../../aio-server-connection';
import { GameInputDisableService } from '../../shared';

@Component({
  selector: 'aio-game-runner',
  templateUrl: './aio-game-runner.component.html',
  styleUrls: ['./aio-game-runner.component.scss']
})
export class AioGameRunnerComponent {

  @ServerEvent() gameUpdate$: Observable<any>;
  connectionData: ConnectionData;

  constructor(
    private server: AioServerConnectionService,
    public gameInput: GameInputDisableService) {
      this.server.connectionData.subscribe(data => this.connectionData = data);
  }

  emitToServer(args: EventArgs) {
    this.server.emit(args);
  }
}
