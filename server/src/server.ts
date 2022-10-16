import cors from "cors";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import calculatePiValue from "./pi";

const app = express();
app.use(cors({ origin: "http://localhost:3000" }))
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let value = "";

io.on("connection", () => {
  calculatePiValue((x) => {
    value = x;
  });
});

app.get("/getpi", (req, res) => {
  return res.status(200).send({ value })
})

server.listen(8888, () => {
  console.log("Listening on *:8888");
});


