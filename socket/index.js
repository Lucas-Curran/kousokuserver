module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("new connection");

    socket.on("disconnect", () => {
      console.log("disconnected");
    });

    socket.on("create-lobby", (roomId, user) => {
      let rooms = Array.from(io.of("/").adapter.rooms.keys());
      if (rooms.includes(roomId)) {
        socket.emit("failed-create");
        return;
      }
      socket.join(roomId);
      socket.emit("lobby-created");
    });

    socket.on("join-lobby", (roomId, user) => {
      let rooms = Array.from(io.of("/").adapter.rooms.keys());
      if (!rooms.includes(roomId)) {
        socket.emit("failed-join", roomId);
        return;
      }
      socket.join(roomId);
      socket.to(roomId).emit("user-connected", user.nickname);
      socket.emit("lobby-joined");
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
