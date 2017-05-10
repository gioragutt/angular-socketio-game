import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Player } from './model';
import { diffMethod, KeyMethod, DiffResult } from './utils'

const playerKey: KeyMethod<Player> = (player: Player) => player.id;
const diffResultOf = <T>(additions: T[], updates: T[], deletes: T[]): DiffResult<T> => {
  return { additions, updates, deletes };
}

describe('diffMethod', () => {

  it('should create empty lists when old and new states are empty', async(() => {
    const diffResult = diffMethod<Player>([], [], playerKey);
    expect(diffResult).toEqual(diffResultOf<Player>([], [], []));
  }));
});
