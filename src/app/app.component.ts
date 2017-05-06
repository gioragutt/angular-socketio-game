import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AioServerConnectionService, ServerEvent, EventArgs } from './aio-server-connection';
import { GameInputDisableService } from './shared';

@Component({
  selector: 'aio-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'aio works!';

  @ServerEvent() gameUpdate$: Observable<any>;

  constructor(
    private server: AioServerConnectionService,
    public gameInput: GameInputDisableService) {
  }

  emitToServer(args: EventArgs) {
    this.server.emit(args);
  }
}
