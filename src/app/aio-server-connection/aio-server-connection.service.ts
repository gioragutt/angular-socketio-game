import * as socketIo from 'socket.io-client';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import 'rxjs/add/operator/share';

interface EventsCache {
  [eventName: string]: Observable<any>;
};

@Injectable()
export class AioServerConnectionService {
  static get instance() {
    return AioServerConnectionService._instance;
  }
  private static _instance: AioServerConnectionService;

  private socket: SocketIOClient.Socket;
  private cache: EventsCache = {};

  constructor() {
    AioServerConnectionService._instance = this;
    this.socket = socketIo();
    console.log('AioServerConnectionService initialized!');
  }

  on<T>(eventName: string): Observable<T> {
    if (!this.cache[eventName]) {
      this.cache[eventName] = new Observable<T>((subscriber: Subscriber<T>) => {
        this.socket.on(eventName, (eventArgs) => {
          subscriber.next(<T>eventArgs);
        });
      }).share();
    }

    return this.cache[eventName];
  }

  emit(eventName: string, eventArgs: any, callback?: any): void {
    if (callback && typeof (callback) === 'function') {
      this.socket.emit(eventName, eventArgs, callback);
    } else {
      this.socket.emit(eventName, eventArgs);
    }
  }
}
