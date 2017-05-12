import { Player, Bullet, ChatMessage, Position } from './index';

export const DefaultPosition: Position = {
    x: 0,
    y: 0
};

export interface AppState {
    id: string;
    players: Player[];
    bullets: Bullet[];
    chatMessages: ChatMessage[];
    mousePosition: Position;
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
    chatMessages: [],
    mousePosition: DefaultPosition
};

