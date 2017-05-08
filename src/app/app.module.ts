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
import { SharedModule } from './shared';
import { AioServerConnectionModule } from './aio-server-connection';
import { AioGameModule } from './aio-game';
import { AioChatModule } from './aio-chat';
import { AioStoreModule } from './aio-store';

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
    SharedModule.forRoot(),
    AioServerConnectionModule.forRoot(),
    AioGameModule,
    AioChatModule,
    AioStoreModule.forRoot(),
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
