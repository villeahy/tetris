export function checkLines(block, gameBoard) {
  // set can only have unique values inside it and it is iterable so used it to take unique rows from block
  const rows = new Set(block.coords.map(obj => obj.row).sort());
  const clear = [...rows].reduce(
    (acc, row) => (checkRow({ row, gameBoard }) ? [...acc, row] : acc),
    []
  );
  return clear.length > 0
    ? {
        gameBoard: clear.reduce((acc, row) => {
          return dropLines({ row, gameBoard });
        }, {}),
        streak: clear.length
      }
    : { gameBoard, streak: 0 };
}

function checkRow({
  row = new Error("You need row in check row"),
  gameBoard,
  column = 0
}) {
  if (gameBoard[column][row] > 0 && gameBoard[column][row] < 9) {
    if (column < gameBoard.length - 1)
      return checkRow({ row, gameBoard, column: column + 1 });
    return true;
  } else {
    return false;
  }
}

function dropLines({
  row = new Error("You need row in droplines"),
  column = 0,
  gameBoard
}) {
  if (row > 0) {
    gameBoard[column][row] = gameBoard[column][row - 1];
    if (column === gameBoard.length - 1) {
      return dropLines({ row: row - 1, gameBoard });
    } else {
      return dropLines({ row, column: column + 1, gameBoard });
    }
  } else {
    gameBoard[column][row] = 0;
    if (column === gameBoard.length - 1) {
      return gameBoard;
    } else {
      return dropLines({ row, column: column + 1, gameBoard });
    }
  }
}
