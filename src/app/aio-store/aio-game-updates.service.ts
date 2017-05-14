import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AioServerConnectionService, ServerEvent, EventArgs, ConnectionData } from '../aio-server-connection';
import { BulletsActions, IdActions, PlayersActions, MousePositionActions, ServerUpdate } from './';

@Injectable()
export class AioGameUpdatesService {

  @ServerEvent() private gameUpdate$: Observable<ServerUpdate>;

  constructor(private server: AioServerConnectionService,
              private bullets: BulletsActions,
              private id: IdActions,
              private players: PlayersActions,
              private mousePosition: MousePositionActions) {
      server.connectionData.subscribe(data => {
        if (data && data.id) {
          id.updateId(data.id);
        }
      });
      this.gameUpdate$.subscribe((update: ServerUpdate) => {
        bullets.updateBullets(update.bullets);
        players.updatePlayers(update.players);
        mousePosition.updateMousePosition(update.mousePosition);
      });
  }

}
