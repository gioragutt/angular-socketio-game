import * as socketIo from 'socket.io-client';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { EventArgs } from './event-args';
import 'rxjs/add/operator/share';

import { environment } from '../../environments/environment';

interface EventsCache {
  [eventName: string]: Observable<any>;
};

export interface ConnectionData {
  id: string;
};

const nullConnectionData: ConnectionData = {
  id: ''
};

@Injectable()
export class AioServerConnectionService {
  static get instance() {
    return AioServerConnectionService._instance;
  }
  private static _instance: AioServerConnectionService;

  private socket: SocketIOClient.Socket;
  private cache: EventsCache = {};

  private _connectionData = new BehaviorSubject<ConnectionData>(nullConnectionData);
  get connectionData(): Observable<ConnectionData> {
    return this._connectionData.asObservable();
  }

  constructor() {
    AioServerConnectionService._instance = this;
    this.socket = socketIo(environment.socketioEndpoint);
    this.socket.on('initialGameData', (data: ConnectionData) => {
      this._connectionData.next(data);
    });
    console.log('AioServerConnectionService initialized!');
  }

  private ensureEventNameIsCached<T>(eventName: string): void {
    if (this.cache[eventName]) {
      return;
    }

    this.cache[eventName] = new Observable<T>((subscriber: Subscriber<T>) => {
      this.socket.on(eventName, (eventArgs) => {
        subscriber.next(<T>eventArgs);
      });
    })
    .share();
  }

  on<T>(eventName: string): Observable<T> {
    this.ensureEventNameIsCached<T>(eventName);

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
