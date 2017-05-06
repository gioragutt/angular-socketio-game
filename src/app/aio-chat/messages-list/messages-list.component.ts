import { Component, Input } from '@angular/core';
import { ChatMessage } from '../index';

@Component({
  selector: 'aio-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss']
})
export class MessagesListComponent {
  @Input() messages: ChatMessage[] = [];
}
