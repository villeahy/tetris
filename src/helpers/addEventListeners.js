import { createStore, applyMiddleware } from "redux";
import Thunk from "redux-thunk";

import { renderBoard, actionMaker, renderPreview } from "../helpers";
import gameReducer from "../reducers/gameReducer";
import roomReducer from "../reducers/roomReducer";

const waitingRoom = createStore(roomReducer);

const makeEmmits = (socket, game, actionTimeout) => () => {
  const [, room] = Object.keys(socket.rooms);
  const state = game.getState();

  const board = renderBoard(state);
  const nextBlocks = state.nextBlocks.map(renderPreview);

  const { opponent, own } = state.updatedStates.reduce(
    (acc, key) => {
      if (key === "block")
        return {
          own: { ...acc.own, ownBoard: board },
          opponent: { ...acc.opponent, opponentBoard: board }
        };
      if (key === "streak")
        return {
          own: { ...acc.own, ownStreak: state.streak },
          opponent: { ...acc.opponent, opponentStreak: state.streak }
        };
      if (key === "clearedLines")
        return {
          own: { ...acc.own, ownCL: state.clearedLines },
          opponent: { ...acc.opponent, opponentCL: state.clearedLines }
        };
      if (key === "nextBlocks")
        return {
          own: { ...acc.own, ownNextBlocks: nextBlocks },
          opponent: { ...acc.opponent, opponentNextBlocks: nextBlocks }
        };
      if (key === "status") {
        return {
          own: {
            ...acc.own,
            status: state.status
          },
          opponent: {
            ...acc.opponent,
            status:
              state.status === "running"
                ? "running"
                : state.status === "lost"
                ? "won"
                : "lost"
          }
        };
      }
      return acc;
    },
    { own: {}, opponent: {} }
  );
  socket.to(room).emit("action", opponent);
  socket.emit("action", own);
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
      unsubscribe = game.subscribe(makeEmmits(socket, game, actionTimeout));
    }
    if (action.type === "GameOver") unsubscribe();
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
