import React, { useRef, useEffect, useState  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from './../store';
import { leaveMember, joinMember, newRoom, setMessage } from './../store/actions';
import { Message } from './../store/type';
import { people, animal } from './../global';
import moment from 'moment';

interface Room {
  client: string,
  room: string
}

const Chat: React.FC = () => {

  const { socket } = useSelector((state: AppState) => state.socket);
  const { selectedRoom } = useSelector((state: AppState) => state.room);
  const { name } = useSelector((state: AppState) => state.client);
  const { messages } = useSelector((state: AppState) => state.message);
  const dispatch = useDispatch();
  const conversation = useRef<HTMLInputElement>(document.createElement("input"));
  const chatRef = useRef<HTMLDivElement>(document.createElement("div"));

  const [, setSlRoom] = useState(selectedRoom);
  useEffect(() => {
    setSlRoom(selectedRoom);
  }, [selectedRoom]);

  useEffect(() => {
    socket.on('greet', (msg: Message) => {
      let sRoom: string = '';
      setSlRoom(thisRoom => {
        sRoom = thisRoom;
        return thisRoom;
      });
      if(msg.room === sRoom){
        dispatch(setMessage(msg));
      }
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
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on('connect', () => {
      console.log(`your socket id is ${socket.id}}`);
      console.log(`is connected ${socket.connected}`);
      if(name !== '') socket.emit('init', name);
    });
    // eslint-disable-next-line
  }, [name]);

  useEffect(() => {
    chatRef.current.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  const other = (msg: Message): JSX.Element => { return (
    <div className="message-item" key={Math.random()}>
        <div className="message-avatar">
            <figure className="avatar">
                <img src={people(msg.client)} className="rounded-circle" alt="avatar" />
            </figure>
            <div>
                <h5>{msg.client}</h5>
                <div className="time">{moment(msg.timestamp).format('L LTS')}</div>
            </div>
        </div>
        <div className="message-content">{msg.message}</div>
    </div>
  )}

  const owner = (msg: Message): JSX.Element => { return (
    <div className="message-item outgoing-message" key={Math.random()}>
        <div className="message-avatar">
            <figure className="avatar">
                <img src={people(msg.client)} className="rounded-circle" alt="avatar" />
            </figure>
            <div>
                <h5>{msg.client}</h5>
                <div className="time">{moment(msg.timestamp).format('L LTS')}</div>
            </div>
        </div>
        <div className="message-content">{msg.message}</div>
    </div>
  )}

  const chatBox: JSX.Element[] = [];
  // eslint-disable-next-line
  messages.map((msg: Message): void => {
    if(msg.room === selectedRoom)
      if(msg.client === '$$$$####****')
        chatBox.push(<div className="message-item messages-divider" data-label="message unread" key={Math.random()}></div>);
      else if(msg.client === name)
        chatBox.push(owner(msg));
      else
        chatBox.push(other(msg));
  })

  const sendMessage = (): void => {
    if(conversation.current.value.length === 0) return;
    socket.emit('greet', {
      room: selectedRoom,
      message: conversation.current.value,
      client: name
    });
    conversation.current.value = "";
  }

  return (
  <>
    <div className="chat">
      <div className="chat-header">
        <div className="chat-header-user">
          <figure className="avatar avatarSize">
            <img src={selectedRoom ? animal(selectedRoom) : '/taan.jpg'} className="rounded-circle" alt="avatar" />
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
        <form onSubmit={e => e.preventDefault()}>
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
