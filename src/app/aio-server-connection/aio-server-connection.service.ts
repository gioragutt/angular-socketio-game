import * as socketIo from 'socket.io-client';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { EventArgs } from './event-args';
import 'rxjs/add/operator/share';

import { environment } from '../../environments/environment';

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
    this.socket = socketIo(environment.socketioEndpoint);
    this.socket.on('initialGameData', (data) => {
      console.log('Connection data', data);
    });
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

  emit(args: EventArgs): void {
    if (args.callback && typeof (args.callback) === 'function') {
      this.socket.emit(args.name, args.data, args.callback);
    } else {
      this.socket.emit(args.name, args.data);
    }
  }
}
