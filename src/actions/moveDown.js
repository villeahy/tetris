import { checkLines } from "./index";
import { blockGenerator, checkDown } from "../helpers";
export function moveDown(state, jump) {
  let { block, gameBoard: board, nextBlocks, streak, clearedLines } = state;
  // checks if you can go down or have to set block and check lines
  if (jump) {
    while (!block.coords.reduce(checkDown(board), 0)) {
      block = {
        ...block,
        coords: block.coords.map(obj => ({ ...obj, row: obj.row + 1 }))
      };
    }
  }

  if (block.coords.reduce(checkDown(board), 0)) {
    block.coords.forEach(obj => {
      board[obj.column][obj.row] = block.value;
    });
    const { gameBoard, newStreak } = checkLines(block, board);
    const [first, ...rest] = nextBlocks;
    return {
      block: first,
      nextBlocks: [...rest, blockGenerator(Math.floor(Math.random() * 7))],
      gameBoard,
      streak: newStreak ? streak + newStreak : newStreak,
      clearedLines: newStreak + clearedLines
    };
  } else {
    return {
      block: {
        ...block,
        coords: block.coords.map(obj => ({ ...obj, row: obj.row + 1 }))
      }
    };
  }
}
