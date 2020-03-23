import React, { useRef, useEffect, useState  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from './../store';
import { leaveMember, joinMember, newRoom } from './../store/actions'

interface Message {
    room: string,
    message: string,
    client: string,
    time: string
}

interface Room {
  client: string,
  room: string
}

const Chat: React.FC = () => {

  const { socket } = useSelector((state: AppState) => state.socket)
  const { selectedRoom, yourRooms } = useSelector((state: AppState) => state.room)
  const { name } = useSelector((state: AppState) => state.client)
  const [messages, setMessage] = useState<Message[]>([]);
  const dispatch = useDispatch();
  const conversation = useRef<HTMLInputElement>(null);

  useEffect(() => {
    socket.on('greet', (msg: Message) => {
      console.log(msg);
      if(yourRooms.includes(msg.room))
        setMessage([...messages, msg]);
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
      console.log(`your socket id is ${socket.id}`);
      console.log(`is disconnected ${socket.disconnected}`);
    });
  }, [messages]);

  const other = (msg: Message):JSX.Element => { return (
    <div className="media w-50 mb-3">
      <div className="media-body ml-3">
        <div className="bg-light rounded py-2 px-3 mb-2">
          <p className="text-small mb-0 text-muted">{msg.message}</p>
        </div>
        <p className="small text-muted">{msg.client} - {msg.time}</p>
      </div>
    </div>
  )}

  const owner = (msg: Message):JSX.Element => { return (
    <div className="media w-50 ml-auto mb-3">
      <div className="media-body">
        <div className="bg-primary rounded py-2 px-3 mb-2">
          <p className="text-small mb-0 text-white">{msg.message}</p>
        </div>
        <p className="small text-muted">{msg.client} - {msg.time}</p>
      </div>
    </div>
  )}

  const chatBox: JSX.Element[] = [];
  messages.map((msg: Message) => {
    if(msg.room === selectedRoom)
      if(msg.client === name)
        chatBox.push(owner(msg))
      else
        chatBox.push(other(msg))
  })

  return (
    <>
      <div className="px-4 py-5 chat-box bg-white">
        {chatBox}
      </div>
      <div className="bg-light">
        <div className="input-group">
          <input type="text" ref={conversation} placeholder="Type a message" className="form-control rounded-0 border-0 py-4 bg-light" />
          <div className="input-group-append">
            <button className="btn btn-link" onClick={() => {
              console.log({
                room: selectedRoom,
                message: conversation.current?.value,
                client: name
              })
              socket.emit('greet', {
                room: selectedRoom,
                message: conversation.current?.value,
                client: name
              })
            }}><i className="fa fa-paper-plane"></i></button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Chat;
