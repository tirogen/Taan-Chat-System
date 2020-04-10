import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from './../store';
import { setName } from './../store/actions';
import { Modal } from 'react-bootstrap';

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
              <img src="https://scontent.furt1-1.fna.fbcdn.net/v/t1.0-9/24301098_1053872401421173_5714868392460303811_n.jpg?_nc_cat=102&_nc_sid=110474&_nc_eui2=AeHKBp1X3Q_CFvOgAVxVVVsB5SmR4t1MMOnlKZHi3Uww6VrOl9PsKHg3drahHKu0cSzYmcq1kVch8PzRqBnuAE0c&_nc_ohc=cYa1eq4nkVkAX85g43K&_nc_ht=scontent.furt1-1.fna&oh=a5c0659ac5d2ffeb400c797394e8df33&oe=5EB787E7" className="rounded-circle" />
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
              <i className="fa fa-comments"></i>
            </a>
          </li>
          <li className="brackets">
            <h5>{name}</h5>
          </li>
          <li data-toggle="tooltip" title="" data-placement="right" data-original-title="User menu">
            <a href="#">
              <figure className="avatar">
                <img src="http://slek.laborasyon.com/demos/dark/dist/media/img/women_avatar5.jpg" className="rounded-circle" alt="image" />
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
