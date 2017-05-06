import {
  Component,
  OnChanges, SimpleChanges,
  ViewChild, ElementRef, HostListener,
  Input, Output, EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { EventArgs } from '../../aio-server-connection';

const codes = {
  68: 'right', // d
  83: 'down',  // s
  65: 'left',  // a
  87: 'up',    // w
  32: 'space'
};

interface Position {
  x: number;
  y: number;
}

const getMousePosition = (canvas: ElementRef, event: MouseEvent): Position => {
  const rect = canvas.nativeElement.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
};

@Component({
  selector: 'aio-game',
  templateUrl: './aio-game.component.html',
  styleUrls: ['./aio-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AioGameComponent implements OnChanges {

  @Input() disableInput = false;
  @Input() height = 500;
  @Input() width = 500;
  @Input() cursorSize = 5;
  @Input() gameData: any;
  @Output() emitEvent = new EventEmitter<EventArgs>();

  @ViewChild('game') canvasRef: ElementRef;
  drawing: CanvasRenderingContext2D;

  emitKeyPress(event: KeyboardEvent, state: boolean) {
    const keycode = event.which || event.keyCode;

    const input = codes[keycode];
    if (input === undefined) {
      return;
    }
    const eventArgs = { name: 'keyPress', data: { input, state } };
    this.emitEvent.emit(eventArgs);
  };

  @HostListener('document:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    if (this.disableInput) {
      return;
    }
    this.emitKeyPress(event, false);
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.disableInput) {
      return;
    }
    this.emitKeyPress(event, true);
  }

  onMouseClick() {
    this.emitEvent.emit({ name: 'mouseClick' });
  }

  onMouseMove(event: MouseEvent) {
      const position = getMousePosition(this.canvasRef, event);
      const eventArgs = { name: 'mouseMove', data: { position } };
      this.emitEvent.emit(eventArgs);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.drawing = this.canvasRef.nativeElement.getContext('2d');
    this.drawing.clearRect(0, 0, this.width, this.height);

    if (!this.gameData) {
      console.log('gameData is not good');
      return;
    }

    const { players, bullets, mousePosition } = this.gameData;

    players.forEach((player, index) => {
      const name = player.id.substring(0, 6);
      this.drawPlayer({ x: player.x, y: player.y }, name);
      this.drawing.fillText(name, 10, 15 * (index + 1));
    });

    bullets.forEach(bullet => this.drawBullet(bullet));

    this.drawCursor(mousePosition);
  }

  drawCursor(position: Position) {
    this.drawing.beginPath();
    this.drawing.moveTo(position.x - this.cursorSize, position.y);
    this.drawing.lineTo(position.x, position.y - this.cursorSize);
    this.drawing.lineTo(position.x + this.cursorSize, position.y);
    this.drawing.lineTo(position.x, position.y + this.cursorSize);
    this.drawing.closePath();
    this.drawing.stroke();
  }

  drawBullet(position: Position) {
    const bulletSize = 5;
    this.drawing.fillRect(position.x - bulletSize,
      position.y - bulletSize,
      bulletSize * 2,
      bulletSize * 2);
  }

  drawPlayer(position: Position, name: string) {
    this.drawing.fillText(name, position.x - 30, position.y - 5);
  }
}
