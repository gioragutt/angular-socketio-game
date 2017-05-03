/**
 * Decorator implementation idea taken from https://github.com/angular-redux/store/blob/master/src/decorators/select.ts
 * Idea is to use a singleton pattern on the wanted service (in our case, the communcation service),
 * And inject it using the `get` property of the target property
 */

import { AioServerConnectionService } from '../aio-server-connection.service';
import { Observable } from 'rxjs/Observable';

export type PropertyDecorator = (target: any, propertyKey: string) => void;

export const ServerEvent = (optionalEventName = ''): PropertyDecorator => {
    return (target: any, propertyKey: string) => {
        let eventName = optionalEventName;
        if (!eventName) {
            eventName = (propertyKey.lastIndexOf('$') === propertyKey.length - 1) ?
                    propertyKey.substring(0, propertyKey.length - 1) :
                    propertyKey;
        }

        console.log(`Creating decorator for the ${eventName} event on property ${propertyKey}`);
        const getter = (): Observable<any> => {
            return AioServerConnectionService.instance.on<any>(eventName);
        };

        if (delete target[propertyKey]) {
            Object.defineProperty(target, propertyKey, {
                get: getter,
                enumerable: true,
                configurable: true
            });
        }
    };
};
