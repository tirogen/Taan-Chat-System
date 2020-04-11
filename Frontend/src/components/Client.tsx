import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from './../store';
import { setName } from './../store/actions';
import { Modal } from 'react-bootstrap';
import { people } from './../global';

const Client: React.FC = () => {

  const { name } = useSelector((state: AppState) => state.client);
  const { socket } = useSelector((state: AppState) => state.socket);
  const dispatch = useDispatch();
  const inputName = useRef<HTMLInputElement>(null);
  const [modalShow, setModalShow] = useState(true);

  return (
  <>
    <Modal
      show={modalShow}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="call">
          <div>
            <figure className="mb-4 avatar avatar-xl">
              <img src="/taan.jpg" className="rounded-circle" />
            </figure>
            <input type="text" ref={inputName} className="form-control" placeholder="Choose Your Name" />
            <button type="button" className="btn btn-success btn-block mt-3" onClick={() => {
              dispatch(setName(inputName.current ?.value || ''));
              socket.emit('init', inputName.current ?.value);
              setModalShow(false);
            }}>I like its.</button>
          </div>
        </div>
      </Modal.Body>
    </Modal>

    <nav className="navigation">
      <div className="nav-group">
        <ul>
          <li className="logo">
            <a href="#">
              <img src={name ? people(name) : '/taan.jpg'} className="rounded-circle w-75" />
            </a>
          </li>
          <li className="brackets">
            <h5>{name}</h5>
          </li>
          <li data-toggle="tooltip" title="" data-placement="right" data-original-title="User menu">
            <a href="#">
              <figure className="avatar">
                <img src={people(name)} className="rounded-circle" alt="image" />
              </figure>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </>
  )
}

export default Client;
