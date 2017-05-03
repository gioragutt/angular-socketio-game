import { Component } from '@angular/core';
import { AioServerConnectionService } from './aio-server-connection';

@Component({
  selector: 'aio-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'aio works!';

  constructor(private server: AioServerConnectionService) {
    server.on<any>('gameUpdate').subscribe((data: any) => {
      console.log('got game update');
    });
  }
}
