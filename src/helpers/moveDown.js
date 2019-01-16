import { checkDown, checkLines, blockGenerator } from "./index";
export function moveDown(block, board, nextBlocks, jump) {
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
    const { gameBoard, streak } = checkLines(block, board);
    const [first, ...rest] = nextBlocks;
    return {
      block: first,
      nextBlocks: [...rest, blockGenerator(Math.floor(Math.random() * 7))],
      gameBoard,
      streak
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
