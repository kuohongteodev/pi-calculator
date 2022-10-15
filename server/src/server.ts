import express from "express";
import http from "http";
import { Server } from "socket.io";
import calculatePiValue from "./pi";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.get("/", (req, res) => {
  //   calculatePi();
  res.send("<h1>Hello World</h1>");
});

io.on("connection", (socket) => {
  let value = "";
  calculatePiValue((x) => {
    value = x;
  });

  socket.on("get", () => {
    socket.emit("get", value);
  });
});

server.listen(8888, () => {
  console.log("Listening on *:8888");
});
