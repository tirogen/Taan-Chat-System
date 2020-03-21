import React, { useContext } from 'react';
// import { CounterProvider } from './../store/CounterProvider'
import {useSelector, useDispatch} from 'react-redux';
import {AppState} from './../store';
import {increment} from './../store/actions'


const Test: React.FC = () => {
  // const { counter, addCounter, subCounter } = useContext(CounterProvider);
  const counter = useSelector((state: AppState) => state.counter)
  const dispatch = useDispatch();

  return (
    <div className="App">
      <p>From test.tsx {counter.n}</p>
      <p>From test.tsx {counter.message}</p>
      <button onClick={() => dispatch(increment())}>Add in test.tsx</button>
    </div>
  );
}

export default Test;
