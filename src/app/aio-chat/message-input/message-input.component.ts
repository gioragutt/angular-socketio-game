import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'aio-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss']
})
export class MessageInputComponent {
  @Output() sendMessage = new EventEmitter<string>();

  @ViewChild('messageInput') messageInput: ElementRef;

  onSubmit() {
    this.sendMessage.emit(this.messageInput.nativeElement.value);
    this.messageInput.nativeElement.value = '';
  }
}
