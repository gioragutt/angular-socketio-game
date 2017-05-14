import { Injectable } from '@angular/core';

import { ServerEvent, AioServerConnectionService } from '../aio-server-connection';
import { Observable } from 'rxjs/Observable';
import { ChatMessage, AppState, ChatMessagesActions } from '../aio-store';

const randomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const randomSpecial = () => {
  return Math.floor(Math.random() * 10) === 0;
};

interface UsersList {
  [source: string]: {
    color: string
  };
}

@Injectable()
export class AioChatService {

  messages: ChatMessage[] = [];
  users: UsersList = {};

  @ServerEvent() message$: Observable<ChatMessage>;

  constructor(private server: AioServerConnectionService,
              private actions: ChatMessagesActions) {
    this.message$.subscribe(message => {
      this.handleNewMessage(message);
      this.actions.addMessages(message);
    });
  }

  private handleNewMessage(message: ChatMessage) {
    if (!this.users[message.source]) {
      this.users[message.source] = {
        color: randomColor()
      };
    }

    message.color = this.users[message.source].color;
    if (message.type === 'playerConnected') {
      message.special = true;
      message.message = `New Played Connected: ${message.source}`;
      message.source = 'GameServer';
      message.color = '#010101';
    } else {
      message.source = message.source.substring(0, 6);
    }
  }

  sendMessage(message: string) {
    this.server.emit({
      name: 'message',
      data: message
    });
  }
}
