/* eslint-disable no-undef */
const { Console } = require("console");

const express = require("express");
server = express();
const http = require("http").Server(server);
const io = require("socket.io")(http);
const path = require('path')

const port = process.env.PORT || 3001;

server.use(express.static(path.join(__dirname, 'front_end/build')))

let interval;
let logs = [];

const getApiAndEmit = socket => {
  // Emitting a new message. Will be consumed by the client
  io.sockets.emit("update", logs);
};

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.emit("update", logs);

   socket.on('newCalculation', (data) => {
      logs.push(data);
      if (logs.length > 10)
      {
         logs = logs.slice(1,)
      } 
      getApiAndEmit(socket)
  });

  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

http.listen(port, () => console.log(`Listening on port ${port}`));
