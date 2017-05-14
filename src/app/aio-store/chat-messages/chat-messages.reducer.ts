import { PayloadAction } from '../';
import { ChatMessagesActions, ChatMessage } from './';

export const chatMessages = (state: ChatMessage[] = [], action: PayloadAction): ChatMessage[] => {
    switch (action.type) {
        case ChatMessagesActions.CHAT_MESSAGES_ADD: {
            if (action.payload.message) {
                return [...state, action.payload.message];
            }
            break;
        }
    }
    return state;
};

