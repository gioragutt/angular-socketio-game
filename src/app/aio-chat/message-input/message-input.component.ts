import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { GameInputDisableService } from '../../shared';

@Component({
  selector: 'aio-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss']
})
export class MessageInputComponent {
  @Output() sendMessage = new EventEmitter<string>();

  @ViewChild('messageInput') messageInput: ElementRef;

  constructor(public gameInput: GameInputDisableService) { }

  onSubmit() {
    const inputValue = this.messageInput.nativeElement.value.trim();
    if (inputValue.length > 0) {
      this.sendMessage.emit(inputValue);
      this.messageInput.nativeElement.value = '';
    }
  }
}
