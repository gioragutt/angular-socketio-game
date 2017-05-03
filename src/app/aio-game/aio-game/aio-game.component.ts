import {
  Component,
  OnInit, OnChanges, OnDestroy, SimpleChanges,
  ViewChild, ElementRef, HostListener,
  Input, Output, EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { EventArgs } from '../../aio-server-connection';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromevent';

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
export class AioGameComponent implements OnInit, OnChanges, OnDestroy {

  @Input() height = 500;
  @Input() width = 500;
  @Input() cursorSize = 5;
  @Input() gameData: any;
  @Output() emitEvent = new EventEmitter<EventArgs>();

  @ViewChild('game') canvasRef: ElementRef;
  drawing: CanvasRenderingContext2D;

  subscriptions: Subscription[] = [];

  ngOnInit() {
    this.drawing = this.canvasRef.nativeElement.getContext('2d');
    this.registerEmitEvents();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  registerEmitEvents() {

    const emitKeyPress = (state) => (event) => {
      const keycode = event.which || event.keyCode;

      const input = codes[keycode];
      if (input === undefined) {
        return;
      }
      const eventArgs = { name: 'keyPress', data: { input, state } };
      console.log('Emitting key-press', eventArgs);
      this.emitEvent.emit(eventArgs);
    };

    const canvas = this.canvasRef.nativeElement;
    this.subscriptions.push(Observable.fromEvent(canvas, 'onmousemove')
      .subscribe((event: MouseEvent) => {
        const position = getMousePosition(this.canvasRef, event);
        const eventArgs = { name: 'mouseMove', data: { position } };
        console.log('Emitting mouse-move', eventArgs);
        this.emitEvent.emit(eventArgs);
      }));
    this.subscriptions.push(Observable.fromEvent(canvas, 'onclick')
      .subscribe(() => {
        console.log('Emitting mouse-click');
        this.emitEvent.emit({ name: 'mouseClick' });
      }));
  }

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
    this.emitKeyPress(event, false);
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    this.emitKeyPress(event, true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.drawing = this.canvasRef.nativeElement.getContext('2d');
    this.drawing.clearRect(0, 0, this.width, this.height);

    if (!this.gameData) {
      console.log('gameData is not good');
      return;
    }

    const { players, bullets, mousePosition } = this.gameData;

    players.forEach(player => this.drawPlayer({
      x: player.x, y: player.y
    }, player.id));

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
    const shortName = name.substring(0, 6);
    this.drawing.fillText(name, position.x - 30, position.y - 5);
  }
}
