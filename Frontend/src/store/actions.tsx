import {CounterAction} from './type';

export const increment = ():CounterAction => {
    return {
      type: 'INCREMENT'
    }
}