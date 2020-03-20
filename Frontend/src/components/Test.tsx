import React, { useContext } from 'react';
import { CounterProvider } from './../store/CounterProvider'

const Test: React.FC = () => {
  const { counter, addCounter, subCounter } = useContext(CounterProvider);

  return (
    <div className="App">
      <h1>{counter}</h1>
      <button onClick={() => addCounter(1)}></button>
    </div>
  );
}

export default Test;
