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
app.get("/", async (req, res) => {
  res.json(waitingRoom.waitingRoom);
});

io.on("connection", async socket => {
  const game = new Game(socket);
  console.log("socket conncected");

  socket.emit("gameStatus", "joined");

  //listen for player actions and returns changes on owm board and emmits them for enemy
  socket.on("action", async (action, callback) => {
    callback(game.action(action));
  });
  //action for looking for new opponent
  socket.on("newOpponent", async () => {
    game.join(waitingRoom.joinGame(socket));
  });
  //tell opponent if you leave
  socket.on("disconnect", async () => {
    console.log("disconnect");
    waitingRoom.leaveLobby(game.room);
    io.to(game.room).emit("opponentLeft");
    socket.eventNames().forEach(event => {
      socket.removeAllListeners(event);
    });
    socket.disconnect(true);
  });
  //if error leave and tell opponent
  socket.on("error", async () => {
    console.log("socket error");
    waitingRoom.leaveLobby(game.room);
    io.to(game.room).emit("opponentLeft");
    socket.eventNames().forEach(event => {
      socket.removeAllListeners(event);
    });
    socket.disconnect(true);
  });
});
