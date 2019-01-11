import express from "express";
import { Server } from "http";
import socketIO from "socket.io";
import { createStore } from "redux";

import Game from "./Classes/Game";
import roomReducer from "./roomReducer";

const app = express();
const server = Server(app);
const io = socketIO(server);

const waitingRoom = createStore(roomReducer);
const port = process.env.PORT || 3000;

const makeCallbacks = (callback, socket) => updates => {
  const [, room] = Object.keys(socket.rooms);
  const { board, streak } = updates;
  socket
    .to(room)
    .emit("action", { opponentBoard: board, opponentStreak: streak });
  socket.emit("action", { ownBoard: board, ownStreak: streak });
};

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// showing waiting room for testing
app.get("/", async (req, res) => {
  res.json(waitingRoom.getState());
});

io.on("connection", async socket => {
  const game = new Game();
  let callbacks;
  console.log("socket conncected");

  socket.emit("gameStatus", "joined");

  //listen for player actions and returns changes on owm board and emmits them for enemy
  socket.on("action", async (action, callback) => {
    if (action.type === "Init") {
      callbacks = makeCallbacks(callback, socket);
      game.callbacks = callbacks;
    }
    callbacks(game.action(action));
  });
  //action for looking for new opponent
  socket.on("newOpponent", async () => {
    const isRoom = waitingRoom.getState();
    if (isRoom) {
      console.log("is room");
      socket.join(isRoom);
      waitingRoom.dispatch({ type: "join", payload: isRoom });
      socket.emit("gameStatus", "ready");
      socket.to(isRoom).emit("gameStatus", "ready");
    } else {
      console.log("else room");
      waitingRoom.dispatch({ type: "join" });
      const room = waitingRoom.getState();
      socket.emit("gameStatus", "waiting");
      socket.join(room);
    }
  });

  socket.on("disconnecting", reason => {
    const [, room] = Object.keys(socket.rooms);
    waitingRoom.dispatch({ type: "leave", payload: room });
    socket.to(room).emit("gameStatus", "won");
  });
  //tell opponent if you leave
  socket.on("disconnect", async () => {
    console.log("disconnect");
    game.action({ type: "GameOver" });
    socket.eventNames().forEach(event => {
      socket.removeAllListeners(event);
    });
    socket.disconnect(true);
  });
  //if error leave and tell opponent
  socket.on("error", async () => {
    console.log("socket error");
    const [, room] = Object.keys(socket.rooms);
    waitingRoom.dispatch({ type: "leave", payload: room });

    socket.eventNames().forEach(event => {
      socket.removeAllListeners(event);
    });
    socket.disconnect(true);
  });
});
