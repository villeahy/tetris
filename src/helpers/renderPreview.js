import { checkDown } from "./index.js";

export function renderPreview(block) {
  const newblockCoords = block.coords.map(obj => ({
    column: obj.column - 3,
    row: obj.row
  }));

  const newBlock = { ...block, coords: newblockCoords };
  const board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

  while (!newBlock.coords.reduce(checkDown(board), false)) {
    for (var i = 0; i < newBlock.coords.length; i++) {
      newBlock.coords[i].row++;
    }
  }
  newBlock.coords.forEach(obj => {
    if (obj.row >= 0) {
      board[obj.column][obj.row] = block.value;
    }
  });

  return board;
}
