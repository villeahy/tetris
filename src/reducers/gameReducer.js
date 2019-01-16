import {
  moveDown,
  moveSide,
  turnBlock,
  emptyBoard,
  blockGenerator
} from "../helpers/";

export default function(
  state = {
    tetrisTimeout: 0,
    gameBoard: emptyBoard(),
    block: blockGenerator(Math.floor(Math.random() * 7)),
    nextBlocks: [
      blockGenerator(Math.floor(Math.random() * 7)),
      blockGenerator(Math.floor(Math.random() * 7)),
      blockGenerator(Math.floor(Math.random() * 7))
    ]
  },
  action
) {
  const { type = "", payload } = action;

  switch (type) {
    case "ArrowLeft":
      console.log("left");
      return {
        ...state,
        ...moveSide(state.block, state.gameBoard, -1)
      };
    case "ArrowRight":
      console.log("right");
      return {
        ...state,
        ...moveSide(state.block, state.gameBoard, 1)
      };
    case "ArrowDown":
      console.log("arrowDown");
      return {
        ...state,
        ...moveDown(state.block, state.gameBoard, state.nextBlocks)
      };
    case "Space":
      console.log("space");
      return {
        ...state,
        ...moveDown(state.block, state.gameBoard, state.nextBlocks, true)
      };

    case "ArrowUp":
      console.log("arrowup");
      return {
        ...state,
        ...turnBlock(state.block, state.gameBoard)
      };
    case "GameOver":
      return state;
    case "Init":
      console.log("init");
      return {
        tetrisTimeout: 0,
        gameBoard: emptyBoard(),
        block: blockGenerator(Math.floor(Math.random() * 7)),
        nextBlocks: [
          blockGenerator(Math.floor(Math.random() * 7)),
          blockGenerator(Math.floor(Math.random() * 7)),
          blockGenerator(Math.floor(Math.random() * 7))
        ]
      };

    default:
      console.log("gameReducer default");
      return state;
  }
}
