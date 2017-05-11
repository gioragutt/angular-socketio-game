import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameInputDisableService } from './game-input-disable.service';

import {
  MdListModule,
  MdToolbarModule,
  MdIconModule,
  MdCardModule,
  MdSidenavModule,
  MdInputModule,
  MdButtonModule
 } from '@angular/material';


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    MdListModule,
    MdToolbarModule,
    MdIconModule,
    MdCardModule,
    MdSidenavModule,
    MdInputModule,
    MdButtonModule
  ],
  declarations: []
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [GameInputDisableService]
    };
  }
}
