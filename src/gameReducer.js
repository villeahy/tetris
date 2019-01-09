import {
  emptyBoard,
  blockGenerator,
  moveDown,
  turnBlock,
  checkDown
} from "./helpers";

const initialState = {
  board: emptyBoard,
  block: blockGenerator(Math.floor(Math.random() * 7)),
  room: ""
};
export default function(
  state = {
    board: emptyBoard.map(arr => [...arr]),
    block: blockGenerator(Math.floor(Math.random() * 7)),
    room: ""
  },
  action
) {
  switch (action.type) {
    case "ArrowLeft":
      console.log("left");
      return { ...state };
    case "ArrowRight":
      console.log("right");
      return { ...state };
    case "ArrowDown":
      console.log("arrowDown");
      return { ...state, ...moveDown(state) };
    case "ArrowUp":
      console.log("arrowup");
      return { ...state, ...turnBlock(state.block, state.board) };
    case "Space":
      console.log("space");
      return { ...state };
    case "Init":
      console.log("init");
      return { ...initialState };
    case "Join":
      console.log("join");
      return { ...state, room: action.payload };
    default:
      console.log("default at game reducer");
      return { ...state };
  }
}
