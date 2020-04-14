import { MessageAction, MessageState, Message } from './../type';
var moment = require('moment');
moment().format();

const initialState: MessageState = {
  messages: []
}

const messageReducer = (state = initialState, action: MessageAction) => {
    switch(action.type){
      case 'SETMESSAGE':
        return {
          messages: [...state.messages, action.message].sort((a: Message, b: Message): number => moment(a.timestamp).dff(b.timestamp))
        };
      default:
        return state;
    }
}

export default messageReducer;
