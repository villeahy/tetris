/*
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import roomReducer from "./reducers/roomReducer";
import gameReducer from "./reducers/gameReducer";

const store = createStore(gameReducer, applyMiddleware(thunk));

store.subscribe(() => {
  console.log(store.getState());
});

let timeout;
const actionMaker = action => dispatch => {
  if (action.type === "ArrowDown" || action.type === "Space") {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      // Yay! Can invoke sync or async actions with `dispatch`
      dispatch(actionMaker(action));
    }, 750);
  } else if (action.type === "GameOver") {
    clearTimeout(timeout);
  }

  dispatch(action);
};

store.dispatch(actionMaker({ type: "ArrowDown" }));

setTimeout(function() {
  store.dispatch(actionMaker({ type: "GameOver" }));
}, 5000);
*/

import { renderPreview } from "./helpers";

renderPreview({
  value: 6,
  turn: 0,
  coords: [
    { row: -3, column: 4 },
    { row: -2, column: 4 },
    { row: -1, column: 4 },
    { row: 0, column: 4 }
  ]
});
