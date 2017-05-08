import { Player, Bullet, ChatMessage } from './index';

export interface AppState {
    id: string;
    players: Player[];
    bullets: Bullet[];
    chatMessages: ChatMessage[];
}

export const INITIAL_STATE: AppState = {
    id: '',
    players: [],
    bullets: [],
    chatMessages: []
};

