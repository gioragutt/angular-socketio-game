export type MessageType = 'message' | 'playerConnected';

export class ChatMessage {
    source: string;
    message: string;
    special = false;
    type: MessageType = 'message';
    color?: string;
}
