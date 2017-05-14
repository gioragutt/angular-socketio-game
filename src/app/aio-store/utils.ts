import * as _ from 'lodash';
import { Player, Bullet } from './';

export type KeyMethod<T> = (data: T) => any;

export const playerKeyMethod: KeyMethod<Player> = (player: Player) => player.id;
export const bulletKeyMethod: KeyMethod<Bullet> = (bullet: Bullet) => bullet.id;

export interface DiffResult<T> {
    additions: T[];
    updates: T[];
    deletes: T[];
};

export type DiffMethod = <T>(oldState: T[], newState: T[], keyMethod: KeyMethod<T>) => DiffResult<T>;

/**
 * diffMethod
 *
 * @param oldState array of items indicating collection before update
 * @param oldState array of items indicating collection before update
 * @param keyMethod method that returns the key of the given type
 * 
 * @return DiffResult<T>
 * additions are items in newState whose key (supplied by keyMethod) is not in oldState
 * deletes are items in oldState whose key is not in newState
 * updates are items whose key is in both oldState and newState, and that have (deeply) changed
 */
export const diffMethod: DiffMethod = <T>(oldState: T[], newState: T[], keyMethod: KeyMethod<T>): DiffResult<T> => {
    const newKeys = _.map(newState, keyMethod);
    const oldKeys = _.map(oldState, keyMethod);

    const addedKeys = _.difference(newKeys, oldKeys);
    const removedKeys = _.difference(oldKeys, newKeys);
    const updatedKeys = _.intersection(oldKeys, newKeys);

    const deletes = _.filter(oldState, item => removedKeys.includes(keyMethod(item)));
    const additions = _.filter(newState, item => addedKeys.includes(keyMethod(item)));
    const updates = _.filter(newState, item => updatedKeys.includes(keyMethod(item)) && _.find(oldState, item) === undefined);

    return {
        additions,
        updates,
        deletes
    };
};
