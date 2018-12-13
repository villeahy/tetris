const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
import Game from "./Classes/Game.js";
import Rooms from "./Classes/Rooms.js";
const rooms = new Rooms(io);
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get("/", function(req, res) {
  res.json(rooms.rooms);
});

io.on("connection", function(socket) {
  const game = new Game(socket);
  game.join(rooms.joinGame(socket));

  socket.on("action", (data, callback) => {
    callback((game.gameBoard = [2]));
  });

  socket.on("newOpponent", () => {
    rooms.leave(game.room, socket);
    game.join(rooms.joinGame(socket), socket);
  });

  socket.on("disconnect", () => {
    socket.to(game.room).emit("opponentLeft");
    rooms.leave(game.room, socket);
  });

  socket.on("error", () => {
    socket.to(game.room).emit("opponentLeft");
    rooms.leave(game.room, socket);
  });
});
