import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AioGameComponent } from './aio-game/aio-game.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AioGameComponent],
  exports: [AioGameComponent]
})
export class AioGameModule { }
