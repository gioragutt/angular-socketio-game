/**
 * Decorator implementation idea taken from https://github.com/angular-redux/store/blob/master/src/decorators/select.ts
 * Idea is to use a singleton pattern on the wanted service (in our case, the communcation service),
 * And inject it using the `get` property of the target property
 */

import { AioServerConnectionService } from '../aio-server-connection.service';
import { Observable } from 'rxjs/Observable';

export type PropertyDecorator = (target: any, propertyKey: string) => void;

const getEventName = (optionalEventName: string, propertyKey: string): string => {
    if (optionalEventName) {
        return optionalEventName;
    }
    return (propertyKey.lastIndexOf('$') === propertyKey.length - 1) ?
            propertyKey.substring(0, propertyKey.length - 1) :
            propertyKey;
};

const createGetter = (eventName: string): () => Observable<any> => {
    return (): Observable<any> => {
        return AioServerConnectionService.instance.on<any>(eventName);
    };
};

const overrideProperty = (target: any, propertyKey: string, getter: () => Observable<any>): void => {
    if (delete target[propertyKey]) {
        Object.defineProperty(target, propertyKey, {
            get: getter,
            enumerable: true,
            configurable: true
        });
    }
};

export const ServerEvent = (optionalEventName = ''): PropertyDecorator => {
    return (target: any, propertyKey: string) => {
        const eventName = getEventName(optionalEventName, propertyKey);
        const getter = createGetter(eventName);
        overrideProperty(target, propertyKey, getter);

        console.log(`== ServerEvent('${eventName}') => ${target.constructor.name}::${propertyKey}`);
    };
};
