import { Server } from "socket.io";

// Create a Socket.IO server instance attached to the HTTP server
const PORT = process.env.PORT || 9000;
const io = new Server(PORT, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  pingTimeout: 500000,
  transports: ["websocket", "polling"],
});

let users = [];

io.on("connection", (socket) => {
  socket.on("addUser", ({ name, id, email, socketId }) => {
    addUser(name, id, email, socket.socketId);
    io.emit("userList", users);
  });

  socket.on("sendRequest", ({ senderSocketId, socketId, username, id }) => {
    socket
      .to(socketId)
      .emit("receiveRequest", { senderSocketId, socketId, username, id });
  });
  socket.on("isRequestAccepted", ({ senderSocketId, flag, id, username }) => {
    socket.to(senderSocketId).emit("isRequestAccepted", { username, flag, id });
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    socket.emit("userList", users);
  });

  socket.on("move", ({ senderSocketId, boxClicked, sign }) => {
    socket.to(senderSocketId).emit("move", { boxClicked, sign });
  });
  socket.on("youarelooser", ({ socketId }) => {
    console.log({ socketId });
    socket.to(socketId).emit("youarelooser", {});
  });
});

function addUser(name, id, email, socketId) {
  const isUserExist = users.some((ele) => ele.id === id);
  if (isUserExist) return;
  users.push({ name, id, email, socketId });
}

function removeUser(socketId) {
  users = users.filter((ele) => ele.socketId === socketId);
}
