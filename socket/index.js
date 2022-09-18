module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("new connection");

    socket.on("disconnect", () => {
      console.log("disconnected");
    });

    socket.on("create-lobby", (roomId, userId) => {
      socket.join(roomId);
      console.log("Lobby created " + roomId + " By user: " + userId);
    });

    socket.on("join-lobby", (roomId, userId) => {
      socket.join(roomId);
      socket.to(roomId).emit("user-connected", userId);
    });

    socket.on("start", (data) => {
      socket.broadcast.emit("start", data);
    });
    socket.on("draw", (data) => {
      socket.broadcast.emit("draw", data);
    });
    socket.on("end", () => {
      socket.broadcast.emit("end");
    });
  });
};
