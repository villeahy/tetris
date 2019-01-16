import { checkDown } from "./checkDown";

export function renderBoard({ gameBoard, block }) {
  const _board = gameBoard.map(arr => [...arr]);
  const _block = {
    ...block,
    coords: [...block.coords.map(obj => ({ ...obj }))]
  };
  // make shadow for lowest position
  while (!_block.coords.reduce(checkDown(gameBoard), false)) {
    for (var i = 0; i < _block.coords.length; i++) {
      _block.coords[i].row++;
    }
  }
  _block.coords.forEach(obj => {
    if (obj.row >= 0) {
      _board[obj.column][obj.row] = 10;
    }
  });

  block.coords.forEach(obj => {
    if (obj.row >= 0) {
      _board[obj.column][obj.row] = block.value;
    }
  });

  return _board;
}
