import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AioGameComponent } from './aio-game/aio-game.component';
import { AioGameRunnerComponent } from './aio-game-runner/aio-game-runner.component';
import { SharedModule } from '../shared';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [AioGameComponent, AioGameRunnerComponent],
  exports: [AioGameRunnerComponent],
})
export class AioGameModule { }
