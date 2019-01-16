import { createStore, applyMiddleware } from "redux";
import Thunk from "redux-thunk";

import { renderBoard, actionMaker, renderPreview } from "../helpers";
import gameReducer from "../reducers/gameReducer";
import roomReducer from "../reducers/roomReducer";

const waitingRoom = createStore(roomReducer);

const makeEmmits = (socket, game) => () => {
  const [, room] = Object.keys(socket.rooms);
  const state = game.getState();
  const board = renderBoard(state);
  const nextBlocks = state.nextBlocks.map(renderPreview);
  socket.to(room).emit("action", {
    status:
      state.status === "running"
        ? "running"
        : state.status === "lost"
        ? "won"
        : "lost",
    opponentBoard: board,
    opponentNextBlocks: nextBlocks,
    opponentStreak: state.streak,
    opponentCL: state.clearedLines
  });
  socket.emit("action", {
    status:
      state.status === "running"
        ? "running"
        : state.status === "lost"
        ? "lost"
        : "won",
    ownBoard: board,
    ownNextBlocks: nextBlocks,
    ownStreak: state.streak,
    ownCL: state.clearedLines
  });
};

function addEventListeners(socket) {
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
}
export { addEventListeners };
