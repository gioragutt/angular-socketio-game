import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AioChatComponent } from './aio-chat/aio-chat.component';
import { MessageInputComponent } from './message-input/message-input.component';
import { MessagesListComponent } from './messages-list/messages-list.component';
import {
  MdListModule,
  MdInputModule,
  MdButtonModule,
  MdIconModule,
} from '@angular/material';
import { MessagesListItemComponent } from './messages-list-item/messages-list-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdListModule,
    MdInputModule,
    MdButtonModule,
    MdIconModule,
  ],
  declarations: [AioChatComponent, MessageInputComponent, MessagesListComponent, MessagesListItemComponent],
  exports: [AioChatComponent]
})
export class AioChatModule { }
