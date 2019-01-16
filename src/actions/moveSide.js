import { updatedState } from "../helpers";

function moveSide(block, board, value) {
  // figre out which side you are going
  const side = value === -1 ? 0 : board.length - 1;
  // chekcs if you can move side if not returns so function will be interupted
  if (
    block.coords.reduce((acc, obj) => {
      if (obj.column === side) return true;
      if (board[obj.column + value][obj.row] > 0) return true;
      return acc;
    }, false)
  ) {
    return {};
  }
  return {
    block: {
      ...block,
      coords: block.coords.map(obj => ({
        ...obj,
        column: obj.column + value
      }))
    }
  };
}
const exportSide = (block, board, value) =>
  updatedState(moveSide(block, board, value));
export { exportSide as moveSide };
