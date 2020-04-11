import React, { useRef, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from './../store';
import { RoomState } from './../store/type';
import { selectRoom, joinRoom, leaveRoom, addRoom, leaveMember, joinMember, setMessage } from './../store/actions';
import { Message } from './../store/type';
import { animal } from './../global';

const Room: React.FC = () => {

  const { name } = useSelector((state: AppState) => state.client)
  const { socket } = useSelector((state: AppState) => state.socket)
  const { messages } = useSelector((state: AppState) => state.message)
  const room: RoomState = useSelector((state: AppState) => state.room)
  const dispatch = useDispatch();
  const inputRoom = useRef<HTMLInputElement>(null);
  const [modalShow, setModalShow] = useState(false);

  const yourRooms: JSX.Element[] = [];
  room.yourRooms.map((room: string): void => {
    yourRooms.push(
      <li className="list-group-item" key={Math.random()}>
          <figure className="avatar">
            <img src={animal(room)} className="rounded-circle" />
          </figure>
        <div className="users-list-body">
          <div>
            <div className="users-list-body">
              <div>
                <h5>{room}</h5>
                <div className="flex">
                  <button className="btn btn-primary btn-sm" onClick={() => {
                    dispatch(selectRoom(room))
                    let lastMsg: string = '2000-01-01T14:00:00.001Z';
                    messages.map((msg: Message): void => {
                      if (msg.room === room)
                        lastMsg = msg.timestamp
                    })
                    console.log({
                      room,
                      timestamp: lastMsg
                    })
                    socket.emit('unread-message', {
                      room,
                      timestamp: lastMsg
                    }, (messages: Message[]) => {
                      if (messages) dispatch(setMessage({ room, message: '$$$$####****', client: '$$$$####****', timestamp: lastMsg }));
                      messages.forEach(msg => {
                        dispatch(setMessage(msg));
                      });
                    })
                  }}>Select</button>
                  <button className="btn btn-danger btn-sm" onClick={() => {
                    dispatch(leaveRoom(room));
                    dispatch(leaveMember(name, room))
                    socket.emit('leave-room', {
                      client: name,
                      room: room
                    });
                  }}>Leave</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    )
  })

  const otherRooms: JSX.Element[] = [];
  room.otherRooms.map((room: string): void => {
    otherRooms.push(
      <li className="list-group-item" key={Math.random()}>
          <figure className="avatar">
            <img src={animal(room)} className="rounded-circle" />
          </figure>
        <div className="users-list-body">
          <div>
            <div className="users-list-body">
              <div>
                <h5>{room}</h5>
                <div className="flex">
                  <button className="btn btn-primary btn-sm" onClick={() => {
                    dispatch(joinRoom(room))
                    dispatch(joinMember(name, room))
                    socket.emit('join-room', {
                      client: name,
                      room: room
                    })
                  }}>Join</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    )
  })

  return (
    <>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Make a room
        </Modal.Title>
      </Modal.Header>
        <Modal.Body>
          <div className="call">
            <div>
              <figure className="mb-4 avatar avatar-xl">
                <img src="/taan.jpg" className="rounded-circle" />
              </figure>
              <input type="text" ref={inputRoom} className="form-control" placeholder="Type a room's name" />
              <button type="button" className="btn btn-success btn-block mt-3" onClick={() => {
                const newRoom: string = inputRoom.current?.value || '';
                dispatch(addRoom(newRoom))
                dispatch(joinMember(name, newRoom))
                socket.emit('new-room', {
                  client: name,
                  room: newRoom
                })
                setModalShow(false);
              }}>I like its.</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div className="sidebar-group">
        <div className="sidebar active">
          <header>
            <span>Your Rooms</span>
            <ul className="list-inline">
              <li className="list-inline-item">
                <button className="btn btn-outline-light" onClick={() => setModalShow(true)}>
                  <i className="fa fa-users"></i>
                </button>
              </li>
            </ul>
          </header>
          <div className="sidebar-body hidescroll">
            <ul className="list-group list-group-flush">
              {yourRooms}
            </ul>
          </div>
        </div>
        <div className="sidebar active">
          <header>
            <span>Other Rooms</span>
          </header>
          <div className="sidebar-body hidescroll">
            <ul className="list-group list-group-flush">
              {otherRooms}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Room;
