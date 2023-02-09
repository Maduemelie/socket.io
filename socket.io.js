const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/home.html");
});

io.on("connection", (socket) => {
  console.log("user connected", socket.id);
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  //broadcast to all clients connected to webSocket
  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });
  //broadcast to all client connected execpt the original sender
  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});

server.listen(3000, () => {
  console.log("listenning on port *: 3000");
});
