const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

import Game from "./Classes/Game.js";
import WaitingRoom from "./Classes/WaitingRoom.js";

const waitingRoom = new WaitingRoom(io);
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// showing waiting room for testing
app.get("/", function(req, res) {
  res.json(waitingRoom.waitingRoom);
});

io.on("connection", function(socket) {
  const game = new Game(socket);
  console.log("socket conncected");

  socket.emit("gameStatus", "joined");

  //listen for player actions and returns changes on owm board and emmits them for enemy
  socket.on("action", (data, callback) => {
    game.block = [
      { i: -2, y: 5 },
      { i: -1, y: 5 },
      { i: 0, y: 4 },
      { i: 0, y: 5 }
    ];
    callback(game.renderBoard());
  });
  //action for looking for new opponent
  socket.on("newOpponent", () => {
    game.join(waitingRoom.joinGame(socket));
  });
  //tell opponent if you leave
  socket.on("disconnect", () => {
    console.log("socket disconnected");
    io.to(game.room).emit("opponentLeft");
    socket.disconnect(true);
  });
  //if error leave and tell opponent
  socket.on("error", () => {
    console.log("socket error");
    io.to(game.room).emit("opponentLeft");
    socket.disconnect(true);
  });
});
