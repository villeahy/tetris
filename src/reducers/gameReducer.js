import { emptyBoard, blockGenerator } from "../helpers/";
import { moveDown, moveSide, turnBlock } from "../actions/";

export default function(
  state = {
    status: "running",
    streak: 0,
    clearedLines: 0,
    gameBoard: emptyBoard(),
    block: blockGenerator(Math.floor(Math.random() * 7)),
    nextBlocks: [
      blockGenerator(Math.floor(Math.random() * 7)),
      blockGenerator(Math.floor(Math.random() * 7)),
      blockGenerator(Math.floor(Math.random() * 7))
    ],
    updatedStates: ["block", "nextBlocks"]
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
        ...moveDown(state)
      };
    case "Space":
      console.log("space");
      return {
        ...state,
        ...moveDown(state, true)
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
        status: "running",
        streak: 0,
        clearedLines: 0,
        gameBoard: emptyBoard(),
        block: blockGenerator(Math.floor(Math.random() * 7)),
        nextBlocks: [
          blockGenerator(Math.floor(Math.random() * 7)),
          blockGenerator(Math.floor(Math.random() * 7)),
          blockGenerator(Math.floor(Math.random() * 7))
        ],
        updatedStates: ["block", "nextBlocks"]
      };

    default:
      console.log("gameReducer default");
      return state;
  }
}
