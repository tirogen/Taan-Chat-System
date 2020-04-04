import { MessageAction, MessageState } from './../type';

const initialState: MessageState = {
  messages: []
}

const messageReducer = (state = initialState, action: MessageAction) => {
    switch(action.type){
      case 'SETMESSAGE':
        return {
          messages: [...state.messages, action.message]
        };
      default:
        return state;
    }
}

export default messageReducer;
