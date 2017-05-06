import { Component } from '@angular/core';
import { AioServerConnectionService, ServerEvent, EventArgs } from './aio-server-connection';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'aio-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'aio works!';

  @ServerEvent() gameUpdate$: Observable<any>;

  constructor(private server: AioServerConnectionService) {
  }

  emitToServer(args: EventArgs) {
    this.server.emit(args);
  }
}
