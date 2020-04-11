import express from "express";
import cors from "cors";
import { Message, Room, Unread, UnreadMessage } from "./type";
import { getUnreadMessage, addUser, addRoom, addMessage, getYourRoom, joinRoom, leaveRoom } from "./database";
import * as SocketIO from 'socket.io';
import * as http from "http";
import * as dotenv from "dotenv";

dotenv.config();

const PORT: string | undefined = process.env.SOCKET_PORT;

const app: express.Application = express();
const server: http.Server = http.createServer(app)
app.use(cors())
const io: SocketIO.Server = SocketIO.listen(server, { origins: '*:*' });;

server.listen(PORT, () => {
  console.log("Running server on port %s", PORT);
});

app.get('/', (req, res) => {
  res.send('Cross your fingers!');
});

io.on("connect", (socket: SocketIO.Socket) => {
  console.log("New user - %s.", socket.id);

  socket.on('unread-message', async ({ room, timestamp }: Unread, fn: Function) => {
      const messages: UnreadMessage[] = await getUnreadMessage(room, timestamp);
      fn(messages);
  })

  socket.on('init', async (client: string) => {
    if(client === '') return;
    await addUser(client);
    const rooms = await getYourRoom(client);
    rooms.forEach((room: {name: string}) => {
      socket.join(room.name);
      io.sockets.emit('join-room', {client, room: room.name});
    });
  })

  socket.on('join-room', async (room: Room) => {
      console.log(`${room.client} join ${room.room}`);
      await joinRoom(room.client, room.room);
      socket.join(room.room);
      io.sockets.emit('join-room', room);
  })

  socket.on('leave-room', async (room: Room) => {
      console.log(`${room.client} leave ${room.room}`);
      await leaveRoom(room.client, room.room);
      socket.leave(room.room);
      io.sockets.emit('leave-room', room);
  })

  socket.on('new-room', async (room: Room) => {
      console.log(`${room.client} new ${room.room}`);
      await addRoom(room.room);
      await joinRoom(room.client, room.room);
      socket.join(room.room);
      io.sockets.emit('new-room', room);
  })

  socket.on('greet', async ({ room, message, client }: Message) => {
      console.log(`${client} said ${message} from ${room}`);
      const timestamp = new Date();
      await addMessage(message, client, room, timestamp.toString());
      io.to(room).emit('greet', { room, message, client, timestamp });
  })
});
