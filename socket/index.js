module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("new connection");

    socket.on("disconnect", () => {
      console.log("disconnected");
    });

    socket.on("start", (data) => {
      console.log(data.y);
      socket.broadcast.emit("start", data);
    });
    socket.on("draw", (data) => {
      console.log(data.y);
      socket.broadcast.emit("draw", data);
    });
    socket.on("end", () => {
      console.log("end");
      socket.broadcast.emit("end");
    });
  });
};
