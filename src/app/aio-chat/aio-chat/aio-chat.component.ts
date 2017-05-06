import { Component, AfterContentInit } from '@angular/core';
import { ServerEvent, AioServerConnectionService } from '../../aio-server-connection';
import { Observable } from 'rxjs/Observable';
import { ChatMessage } from '../index';

const generateColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

interface UsersList {
  [source: string]: {
    color: string
  };
}

@Component({
  selector: 'aio-chat',
  templateUrl: './aio-chat.component.html',
  styleUrls: ['./aio-chat.component.scss']
})
export class AioChatComponent implements AfterContentInit {
  messages: ChatMessage[] = [];
  users: UsersList = {};

  @ServerEvent() message$: Observable<ChatMessage>;

  constructor(private server: AioServerConnectionService) { }

  ngAfterContentInit(): void {
    this.message$.subscribe(message => {
      this.handleNewMessage(message);
      this.messages.push(message);
    });
  }

  handleNewMessage(message: ChatMessage) {
    if (!this.users[message.source]) {
      this.users[message.source] = {
        color: generateColor()
      };
    }
    message.color = this.users[message.source].color;
  }

  sendMessage(message: string) {
    this.server.emit({
      name: 'message',
      data: message
    });
  }
}
