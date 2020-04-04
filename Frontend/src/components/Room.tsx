import React, { useRef } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from './../store';
import { RoomState } from './../store/type';
import { selectRoom, joinRoom, leaveRoom, addRoom, leaveMember, joinMember, setMessage } from './../store/actions';
import { Message } from './../store/type';

const Room: React.FC = () => {

  const { name } = useSelector((state: AppState) => state.client)
  const { socket } = useSelector((state: AppState) => state.socket)
  const { messages } = useSelector((state: AppState) => state.message)
  const room: RoomState = useSelector((state: AppState) => state.room)
  const dispatch = useDispatch();
  const inputRoom = useRef<HTMLInputElement>(null);

  const yourRooms: JSX.Element[] = [];
  room.yourRooms.map((room: string): void => {
    yourRooms.push(
      <Card body key={Math.random()}>
        <Row>{room}</Row>
        <Row>
          <Col><button onClick={() => {
            dispatch(selectRoom(room))
            let lastMsg: string = '2000-01-01T14:00:00.001Z';
            messages.map((msg: Message): void => {
              if(msg.room === room)
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
              if(messages) dispatch(setMessage({ room, message: '$$$$####****', client: '$$$$####****', timestamp: lastMsg }));
              messages.forEach(msg => {
                dispatch(setMessage(msg));
              });
            })
          }}>Select</button></Col>
          <Col><button onClick={() => {
            dispatch(leaveRoom(room));
            dispatch(leaveMember(name, room))
            socket.emit('leave-room', {
              client: name,
              room: room
            });
          }}>Leave</button></Col>
        </Row>
      </Card>
    )
  })

  const otherRooms: JSX.Element[] = [];
  room.otherRooms.map((room: string): void => {
    otherRooms.push(
      <Card body key={Math.random()}>
        <Row>{room}</Row>
        <Row><button onClick={() => {
          dispatch(joinRoom(room))
          dispatch(joinMember(name, room))
          socket.emit('join-room', {
            client: name,
            room: room
          })
        }}>JOIN</button></Row>
      </Card>
    )
  })

  return (
    <>
      <h2>Your Room</h2>
      {yourRooms}
      <h2>Other Room</h2>
      {otherRooms}
      <h2>Add Room</h2>
      <input type="text" ref={inputRoom} />
      <button onClick={() => {
        const newRoom: string = inputRoom.current?.value || '';
        dispatch(addRoom(newRoom))
        dispatch(joinMember(name, newRoom))
        socket.emit('new-room', {
          client: name,
          room: newRoom
        })
      }}>Add room</button>
    </>
  )
}

export default Room;
