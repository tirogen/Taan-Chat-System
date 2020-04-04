import { SocketAction, SocketState } from './../type';
import socketIOClient from "socket.io-client";

const initialState: SocketState = {
  socket: socketIOClient('http://localhost:3001')
}

const socketReducer = (state = initialState, action: SocketAction) => {
    switch(action.type){
      case 'SETSOCKET':
        return {
          socket: action.socket
        };
      default:
        return state;
    }
}

export default socketReducer;
