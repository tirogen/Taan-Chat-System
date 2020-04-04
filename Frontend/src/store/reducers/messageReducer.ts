import { MessageAction, MessageState } from './../type';

const initialState: MessageState = {
  messages: []
}

const messageReducer = (state = initialState, action: MessageState) => {
    switch(action.type){
      case 'SETMESSAGE':
        return {
          messages: [...messages, msg]
        };
      default:
        return state;
    }
}

export default messageReducer;
