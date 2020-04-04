import { RoomAction, RoomState } from './../type';

const initialState: RoomState = {
  selectedRoom: '',
  yourRooms: [],
  otherRooms: []
}

const roomReducer = (state = initialState, action: RoomAction) => {
    switch(action.type){
      case 'SELECTROOM':
        return {
          selectedRoom: action.room,
          yourRooms: state.yourRooms
          otherRooms: state.otherRooms.filter(room => room !== action.room)
        };
      case 'JOINROOM':
        return {
          selectedRoom: action.room,
          yourRooms: state.yourRooms.filter(room => room !== action.room).push(action.room),
          otherRooms: state.otherRooms.filter(room => room !== action.room)
        };
      case 'LEAVEROOM':
        return {
          selectedRoom: state.selectedRoom === action.room ? '' : state.selectedRoom ,
          yourRooms: state.yourRooms.filter(room => room !== action.room),
          otherRooms: state.otherRooms.filter(room => room !== action.room).push(action.room)
        };
      case 'ADDROOM':
        return {
          selectedRoom: action.room,
          yourRooms: state.yourRooms.indexOf(action.room) === -1 ? [...state.yourRooms, action.room] : state.yourRooms,
          otherRooms: state.otherRooms.indexOf(action.room) === -1 ? state.otherRooms : state.otherRooms.filter(room => room !== action.room)
        };
      //instruction from backend
      case 'NEWROOM':
        return {
          selectedRoom: state.selectedRoom,
          yourRooms: state.yourRooms,
          otherRooms: state.otherRooms.indexOf(action.room) === -1 && state.yourRooms.indexOf(action.room) === -1 ? [...state.otherRooms, action.room] : state.otherRooms,
        };
      default:
        return state;
    }
}

export default roomReducer;
