import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ChatMessage, AppState } from '../../aio-store/model';
import { select } from '@angular-redux/store';
import { AioChatService } from '../aio-chat.service';

@Component({
  selector: 'aio-chat',
  templateUrl: './aio-chat.component.html',
  styleUrls: ['./aio-chat.component.scss']
})
export class AioChatComponent {
  @select() chatMessages$: Observable<ChatMessage>;

  constructor(private service: AioChatService) { }

  private sendMessage(message: string) {
    this.service.sendMessage(message);
  };
}
