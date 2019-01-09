import express from "express";
import { Server } from "http";
import socketIO from "socket.io";
import { createStore } from "redux";

import Game from "./Classes/Game";
import roomReducer from "./roomReducer";
import gameReducer from "./gameReducer";
import { renderBoard } from "./helpers";

const app = express();
const server = Server(app);
const io = socketIO(server);

const waitingStore = createStore(roomReducer);
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// showing waiting room for testing
app.get("/", async (req, res) => {
  res.json(waitingStore.getState());
});

io.on("connection", async socket => {
  const game = new Game();
  console.log("socket conncected");

  socket.emit("gameStatus", "joined");

  //listen for player actions and returns changes on owm board and emmits them for enemy
  socket.on("action", async (type, callback) => {
    const { board, streak } = game.action(type);
    console.log(streak);
    const [, room] = Object.keys(socket.rooms);
    socket
      .to(room)
      .emit("action", { opponentBoard: board, opponentStreak: streak });
    callback({ ownBoard: board, ownStreak: streak });
  });
  //action for looking for new opponent
  socket.on("newOpponent", async () => {
    const isRoom = waitingStore.getState();
    game.action({ type: "Init" });
    if (isRoom) {
      console.log("is room");
      socket.join(isRoom);
      waitingStore.dispatch({ type: "join", payload: isRoom });
      socket.emit("gameStatus", "ready");
      socket.to(isRoom).emit("gameStatus", "ready");
    } else {
      console.log("else room");
      waitingStore.dispatch({ type: "join" });
      const room = waitingStore.getState();
      socket.emit("gameStatus", "waiting");
      socket.join(room);
    }
  });

  socket.on("disconnecting", reason => {
    const [, room] = Object.keys(socket.rooms);
    waitingStore.dispatch({ type: "leave", payload: room });
    socket.to(room).emit("gameStatus", "won");
  });
  //tell opponent if you leave
  socket.on("disconnect", async () => {
    console.log("disconnect");
    socket.eventNames().forEach(event => {
      socket.removeAllListeners(event);
    });
    socket.disconnect(true);
  });
  //if error leave and tell opponent
  socket.on("error", async () => {
    console.log("socket error");
    const [, room] = Object.keys(socket.rooms);
    waitingStore.dispatch({ type: "leave", payload: room });

    socket.eventNames().forEach(event => {
      socket.removeAllListeners(event);
    });
    socket.disconnect(true);
  });
});

/*
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
*/
