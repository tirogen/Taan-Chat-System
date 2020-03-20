import express from "express";
import cors from "cors";
import * as http from "http";

const PORT: number = 3001;
interface Message {
   room: string;
   message: string;
   owner: string;
}

const app: express.Application = express();
const server: http.Server = http.createServer(app)
app.use(cors())
const io: SocketIO.Server = require("socket.io").listen(server, { origins: '*:*'});;

server.listen(PORT, () => {
  console.log("Running server on port %s", PORT);
});

app.get('/', (req, res) => {
  res.send('Cross your fingers!');
});

io.on("connect", (socket: any) => {
  console.log("New user - %s.", socket.id);

  socket.on('join-room', (roomName: string) => {
      console.log(`${socket.id} join ${roomName}`);
      socket.join(roomName);
  })

  socket.on('leave-room', (roomName: string) => {
      console.log(`${socket.id} leave ${roomName}`);
      socket.leave(roomName);
  })

  socket.on('greet', ({room, message, owner}: Message) => {
      console.log(`${owner} said ${message}`);
      io.to(room).emit('display', {room, message, owner});
  })
});
