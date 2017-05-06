import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {
  MdToolbarModule,
  MdIconModule,
  MdCardModule,
  MdSidenavModule,
  MdInputModule,
  MdButtonModule
 } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AioServerConnectionModule } from './aio-server-connection';
import { AioGameModule } from './aio-game';
import { AioChatModule } from './aio-chat';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AioServerConnectionModule.forRoot(),
    AioGameModule,
    AioChatModule,
    MdToolbarModule,
    MdIconModule,
    MdCardModule,
    MdSidenavModule,
    MdButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
