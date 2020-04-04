import React, { useRef, useEffect, useState  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from './../store';
import { leaveMember, joinMember, newRoom, setMessage } from './../store/actions'
import { Message } from './../store/type'

interface Room {
  client: string,
  room: string
}

const Chat: React.FC = () => {

  const { socket } = useSelector((state: AppState) => state.socket)
  const { selectedRoom, yourRooms } = useSelector((state: AppState) => state.room)
  const { name } = useSelector((state: AppState) => state.client)
  const { messages } = useSelector((state: AppState) => state.message)
  const dispatch = useDispatch();
  const conversation = useRef<HTMLInputElement>(null);

  useEffect(() => {
    socket.on('greet', (msg: Message) => {
      console.log(msg)
      if(msg.room === selectedRoom)
        dispatch(setMessage(msg))
    });
    socket.on('join-room', (msg: Room) => {
      dispatch(joinMember(msg.client, msg.room))
    });
    socket.on('leave-room', (msg: Room) => {
      dispatch(leaveMember(msg.client, msg.room))
    });
    socket.on('new-room', (room: Room) => {
      dispatch(newRoom(room.room))
      dispatch(joinMember(room.client, room.room))
    });
    socket.on('connect', () => {
      console.log(`your socket id is ${socket.id}}`);
      console.log(`is connected ${socket.connected}`);
      socket.emit('init', name);
    });
  }, [yourRooms, name]);

  const other = (msg: Message): JSX.Element => { return (
    <div className="media w-50 mb-3" key={Math.random()}>
      <div className="media-body ml-3">
        <div className="bg-light rounded py-2 px-3 mb-2">
          <p className="text-small mb-0 text-muted">{msg.message}</p>
        </div>
        <p className="small text-muted">{msg.client} - {msg.timestamp}</p>
      </div>
    </div>
  )}

  const owner = (msg: Message): JSX.Element => { return (
    <div className="media w-50 ml-auto mb-3" key={Math.random()}>
      <div className="media-body">
        <div className="bg-primary rounded py-2 px-3 mb-2">
          <p className="text-small mb-0 text-white">{msg.message}</p>
        </div>
        <p className="small text-muted">{msg.client} - {msg.timestamp}</p>
      </div>
    </div>
  )}

  const chatBox: JSX.Element[] = [];
  messages.map((msg: Message): void => {
    if(msg.room === selectedRoom)
      if(msg.client === name)
        chatBox.push(owner(msg))
      else
        chatBox.push(other(msg))
  })

  const sendMessage = (): void => {
    socket.emit('greet', {
      room: selectedRoom,
      message: conversation.current?.value,
      client: name
    })
  }

  return (
    <>
      <div className="px-4 py-5 chat-box bg-white">
        {chatBox}
      </div>
      <div className="bg-light">
        <div className="input-group">
          <input type="text" ref={conversation} placeholder="Type a message" className="form-control rounded-0 border-0 py-4 bg-light" />
          <div className="input-group-append">
            <button className="btn btn-link" onClick={sendMessage}><i className="fa fa-paper-plane"></i></button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Chat;
