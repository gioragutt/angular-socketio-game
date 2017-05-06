import { Component, Input } from '@angular/core';
import { ChatMessage } from '../index';

@Component({
  selector: 'aio-messages-list-item',
  templateUrl: './messages-list-item.component.html',
  styleUrls: ['./messages-list-item.component.scss']
})
export class MessagesListItemComponent {
  @Input() message: ChatMessage;
}
