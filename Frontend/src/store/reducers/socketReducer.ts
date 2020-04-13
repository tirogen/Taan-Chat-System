import { SocketAction, SocketState } from './../type';
import socketIOClient from "socket.io-client";

const initialState: SocketState = {
  socket: socketIOClient('http://ip172-18-0-130-bqaa90lim9m000fjl320-8080.direct.labs.play-with-docker.com')
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
