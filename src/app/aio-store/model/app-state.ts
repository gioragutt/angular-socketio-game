import { Player, Bullet, ChatMessage, Position } from './index';

export interface AppState {
    id: string;
    players: Player[];
    bullets: Bullet[];
    chatMessages: ChatMessage[];
}

export interface ServerUpdate {
    players: Player[];
    bullets: Bullet[];
    mousePosition: Position;
}

export const INITIAL_STATE: AppState = {
    id: '',
    players: [],
    bullets: [],
    chatMessages: []
};

