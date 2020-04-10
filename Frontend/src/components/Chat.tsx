import React, { useRef, useEffect, useState  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from './../store';
import { leaveMember, joinMember, newRoom, setMessage } from './../store/actions';
import { Message } from './../store/type';
import { people, animal } from './../global';

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
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on('greet', (msg: Message) => {
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
      if(name !== '') socket.emit('init', name);
    });

  }, [yourRooms, name]);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current?.scrollHeight);
  }, [messages]);

  const other = (msg: Message): JSX.Element => { return (
    <div className="message-item" key={Math.random()}>
        <div className="message-avatar">
            <figure className="avatar">
                <img src={people(msg.client)} className="rounded-circle" />
            </figure>
            <div>
                <h5>{msg.client}</h5>
                <div className="time">{msg.timestamp}</div>
            </div>
        </div>
        <div className="message-content">{msg.message}</div>
    </div>
  )}

  const owner = (msg: Message): JSX.Element => { return (
    <div className="message-item outgoing-message" key={Math.random()}>
        <div className="message-avatar">
            <figure className="avatar">
                <img src={people(msg.client)} className="rounded-circle" />
            </figure>
            <div>
                <h5>{msg.client}</h5>
                <div className="time">{msg.timestamp}</div>
            </div>
        </div>
        <div className="message-content">{msg.message}</div>
    </div>
  )}

  const chatBox: JSX.Element[] = [];
  messages.map((msg: Message): void => {
    if(msg.room === selectedRoom)
      if(msg.client === '$$$$####****')
        chatBox.push(<div className="message-item messages-divider" data-label="message unread"></div>);
      else if(msg.client === name)
        chatBox.push(owner(msg));
      else
        chatBox.push(other(msg));
  })

  const sendMessage = (): void => {
    socket.emit('greet', {
      room: selectedRoom,
      message: conversation.current?.value,
      client: name
    });
  }

  return (
  <>
    <div className="chat">
      <div className="chat-header">
        <div className="chat-header-user">
          <figure className="avatar">
            <img src={selectedRoom ? animal(selectedRoom) : '/banana.jpg'} className="rounded-circle" />
          </figure>
          <div>
            <h5>{selectedRoom}</h5>
          </div>
        </div>
      </div>
      <div className="chat-body hidescroll" ref={chatRef}>
        <div className="messages">
          {chatBox}
        </div>
      </div>
      <div className="chat-footer">
        <form onSubmit={e => { e.preventDefault(); }}>
          <input type="text" ref={conversation} className="form-control" placeholder="Write a message." />
          <div className="form-buttons">
            <button className="btn btn-primary" onClick={sendMessage}><i className="fa fa-paper-plane"></i></button>
          </div>
        </form>
      </div>
    </div>
  </>
  )
}

export default Chat;
