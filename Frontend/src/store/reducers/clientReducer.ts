import { ClientAction, ClientState } from './../type';

const initialState: ClientState = {
  name: ''
}

const clientReducer = (state = initialState, action: ClientAction) => {
    switch(action.type){
      case 'SETNAME':
        return {
          name: action.name
        };
      default:
        return state;
    }
}

export default clientReducer;
