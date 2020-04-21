import { MessageAction, MessageState, Message } from './../type';
const moment = require('moment');
moment().format();

const initialState: MessageState = {
  messages: []
}

const messageReducer = (state = initialState, action: MessageAction) => {
    switch(action.type){
      case 'SETMESSAGE':
        return {
          messages: [...state.messages, action.message].sort((a: Message, b: Message): number => {
            let t1 = moment(a.timestamp);
            let t2 = moment(b.timestamp);
            return t1-t2;
          })
        };
      default:
        return state;
    }
}

export default messageReducer;
