import { checkDown, checkLines, blockGenerator } from "./index";
export function moveDown(block, board, jump) {
  // checks if you can go down or have to set block and check lines
  if (jump) {
    while (!block.coords.reduce(checkDown(board), false)) {
      block = {
        ...block,
        coords: block.coords.map(obj => ({ ...obj, row: obj.row + 1 }))
      };
    }
  }

  if (block.coords.reduce(checkDown(board), false)) {
    block.coords.forEach(obj => {
      board[obj.column][obj.row] = block.value;
    });
    const checked = checkLines(block, board);

    return {
      block: blockGenerator(Math.floor(Math.random() * 7)),
      gameBoard: checked.gameBoard,
      streak: checked.streak
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
