import { SocketAction, SocketState } from './../type';
import socketIOClient from "socket.io-client";

const initialState: SocketState = {
  socket: socketIOClient(process.env.REACT_APP_SOCKET_GATEWAY || 'localhost:8080')
}

console.log(process.env.REACT_APP_SOCKET_GATEWAY);

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
