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
  const [messages, setMessage] = useState<Message[]>([]);

  useEffect(() => {
    socket.on('greet', (msg: Message) => {
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

  }, []);

  const { name } = useSelector((state: AppState) => state.client)
  const { selectedRoom, yourRooms } = useSelector((state: AppState) => state.room)

  const dispatch = useDispatch();
  const conversation = useRef<HTMLInputElement>(null);

  return (
    <>


    </>
  )
}

export default Chat;
