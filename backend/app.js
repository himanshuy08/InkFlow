import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = createServer(app);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

const PORT = 5000;

const users = {};

io.on("connection", (socket) => {
  console.log("User Connected !");
  console.log("ID :", socket.id);

  socket.on("setUserName", (userName) => {
    users[socket.id] = {
      id: socket.id,
      name: userName,
    };
    io.emit("updateUserList", Object.values(users));
    io.emit("userJoined", userName);
    console.log(`${userName} joined the room`);
  });

  socket.on("disconnect", () => {
    const user = users[socket.id];
    if (user) {
      console.log(`${user.name} disconnected from server`);
      delete users[socket.id];
      io.emit("updateUserList", Object.values(users));
      socket.broadcast.emit("userLeft", user.name);
      console.log(`${user.name} left the room`);
    }
  });

  socket.on("leaveRoom", () => {
    const user = users[socket.id];
    if (user) {
      console.log(`${user.name} left the room`);
      delete users[socket.id];
      io.emit("updateUserList", Object.values(users));
      socket.broadcast.emit("userLeft", user.name);
    }
  });

  socket.on("mouseMove", (data) => {
    console.log(data);
    socket.broadcast.emit("draw", data);
  });

  socket.emit("welcome", "Welcome to the server!");
});

server.listen(PORT, () => {
  console.log(`Server running on :http://localhost:${PORT}`);
});
