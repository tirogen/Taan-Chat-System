import express from "express";
import cors from "cors";
import * as SocketIO from 'socket.io';
import * as http from "http";

const PORT: number = 3001;
interface Message {
   room: string,
   message: string,
   client: string
}

interface Room {
  client: string,
  room: string
}

const app: express.Application = express();
const server: http.Server = http.createServer(app)
app.use(cors())
const io: SocketIO.Server = SocketIO.listen(server, { origins: '*:*'});;

server.listen(PORT, () => {
  console.log("Running server on port %s", PORT);
});

app.get('/', (req, res) => {
  res.send('Cross your fingers!');
});

io.on("connect", (socket: any) => {
  console.log("New user - %s.", socket.id);

  socket.on('join-room', (room: Room) => {
      console.log(`${room.client} join ${room.room}`);
      socket.join(room.room);
      io.sockets.emit('join-room', room);
  })

  socket.on('leave-room', (room: Room) => {
      console.log(`${room.client} leave ${room.room}`);
      socket.leave(room.room);
      io.sockets.emit('leave-room', room);
  })

  socket.on('new-room', (room: Room) => {
      console.log(`${room.client} new ${room.room}`);
      socket.join(room.room);
      io.sockets.emit('new-room', room);
  })

  socket.on('greet', ({ room, message, client }: Message) => {
      console.log(`${client} said ${message} from ${room}`);
      const timestamp = Date.now();
      io.to(room).emit('greet', { room, message, client, timestamp });
  })
});
