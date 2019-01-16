import express from "express";
import { Server } from "http";
import socketIO from "socket.io";
import { createStore, applyMiddleware } from "redux";
import Thunk from "redux-thunk";

import { renderBoard, actionMaker, renderPreview } from "./helpers";
import roomReducer from "./reducers/roomReducer";
import gameReducer from "./reducers/gameReducer";

const app = express();
const server = Server(app);
const io = socketIO(server);

const waitingRoom = createStore(roomReducer);
const port = process.env.PORT || 3000;

const makeEmmits = (socket, game) => () => {
  const [, room] = Object.keys(socket.rooms);
  const state = game.getState();
  const board = renderBoard(state);
  const nextBlocks = state.nextBlocks.map(renderPreview);
  socket.to(room).emit("action", {
    opponentBoard: board,
    opponentNextBlocks: nextBlocks
  });
  socket.emit("action", { ownBoard: board, ownNextBlocks: nextBlocks });
};

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// showing waiting room for testing
app.get("/", async (req, res) => {
  res.json(waitingRoom.getState());
});

io.on("connection", async socket => {
  const game = createStore(gameReducer, applyMiddleware(Thunk));
  let unsubscribe;
  const actionTimeout = actionMaker();

  console.log("socket conncected");

  socket.emit("gameStatus", "joined");

  //listen for player actions and emmits them for enemy and yourself
  socket.on("action", async (action, callback) => {
    if (action.type === "Init") {
      if (unsubscribe) unsubscribe();
      unsubscribe = game.subscribe(makeEmmits(socket, game));
    }
    game.dispatch(actionTimeout(action, actionTimeout));
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
    game.dispatch(actionTimeout({ type: "GameOver" }, actionTimeout));
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
    socket.disconnect(true);
  });
});
