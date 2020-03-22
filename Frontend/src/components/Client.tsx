import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from './../store';
import { setName } from './../store/actions'

const Client: React.FC = () => {

  const { name } = useSelector((state: AppState) => state.client)
  const dispatch = useDispatch();
  const inputName = useRef<HTMLInputElement>(null);

  return (
    <>
      <input type="text" ref={inputName} />
      <button onClick={() => dispatch(setName(inputName.current?.value || ''))}>SETNAME</button>
      <p>{name}</p>
    </>
  )
}

export default Client;
