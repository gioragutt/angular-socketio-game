import { PayloadAction } from '../action';
import { ChatMessage, INITIAL_STATE } from '../model';
import { ChatMessagesActions } from '../actions';

export const chatMessages = (state: ChatMessage[] = INITIAL_STATE.chatMessages, action: PayloadAction): ChatMessage[] => {
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

