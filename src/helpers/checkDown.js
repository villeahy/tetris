export const checkDown = gameBoard => (acc, obj) => {
  //if (obj.row < 0 && gameBoard[obj.column][obj.row + 1] > 0) return 2;
  if (obj.row < 0) return acc;
  if (
    gameBoard[obj.column][obj.row + 1] > 0 ||
    gameBoard[obj.column][obj.row + 1] === undefined
  )
    return 1;
  return acc;
};
