import express from "express";
import cors from "cors";
import * as http from "http";

const PORT:number = process.env.HTTP_PORT || 3000;

const app:express.Application = express();
const server:http.Server = http.createServer(app)
app.use(cors())

server.listen(PORT, () => {
  console.log("Running server on port %s", PORT);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});
