import { Component } from '@angular/core';
import { AioServerConnectionService, onEvent } from './aio-server-connection';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'aio-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'aio works!';

  @onEvent() gameUpdate$: Observable<any>;
  @onEvent('gameUpdate') gameUpdate2$: Observable<number>;

  constructor(private server: AioServerConnectionService) {
    this.gameUpdate$.subscribe((data: any) => {
      console.log('got game update1');
    });
  }
}
