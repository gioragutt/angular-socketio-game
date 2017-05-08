import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AioServerConnectionService, ServerEvent, EventArgs, ConnectionData } from './aio-server-connection';
import { GameInputDisableService } from './shared';

@Component({
  selector: 'aio-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ServerEvent() gameUpdate$: Observable<any>;
  connectionData: ConnectionData;

  constructor(
    private server: AioServerConnectionService,
    public gameInput: GameInputDisableService) {
      server.connectionData.subscribe(data => this.connectionData = data);
  }

  emitToServer(args: EventArgs) {
    this.server.emit(args);
  }
}
