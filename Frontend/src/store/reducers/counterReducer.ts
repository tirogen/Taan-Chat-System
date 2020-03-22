import { CounterAction, CounterState } from './../type';

const initialState: CounterState = {
  n: 0,
  message: 'Hi'
}

const counterReducer = (state = initialState, action:CounterAction) => {
    switch(action.type){
      case 'INCREMENT':
        return {
          n: state.n + 1,
          message: state.n%2===0?'Hi':'Fuck you'
        };
      default:
        return state;
    }
}

export default counterReducer;
