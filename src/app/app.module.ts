import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AioServerConnectionModule } from './aio-server-connection';
import { AioGameModule } from './aio-game';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AioServerConnectionModule.forRoot(),
    AioGameModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
