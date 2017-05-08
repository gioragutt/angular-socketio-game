import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState, ChatMessage } from '../model';

@Injectable()
export class ChatMessagesActions {
  static CHAT_MESSAGES_ADD = 'CHAT_MESSAGES_ADD';

  constructor(private store: NgRedux<AppState>) { }

  addMessages(message: ChatMessage) {
    this.store.dispatch({
      type: ChatMessagesActions.CHAT_MESSAGES_ADD,
      payload: {
        message
      }
    });
  }

}
