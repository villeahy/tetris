export function checkLines({
  gameBoard,
  i = gameBoard[0].length - 1,
  column = 0
}) {
  if (i === 0 && column === gameBoard.length - 1) {
    if (!gameBoard[column][i]) return gameBoard;
    return clearLine({ i, gameBoard });
  } else if (i === 0) {
    if (!gameBoard[column][i]) return gameBoard;
    return checkLines({ column: column + 1, i, gameBoard });
  } else if (column === gameBoard.length - 1) {
    if (!gameBoard[column][i]) {
      return checkLines({ column: 0, i: i - 1, gameBoard });
    }
    return checkLines({
      column: 0,
      i: i - 1,
      gameBoard: dropLines({
        i: i - 1,
        gameBoard: clearLine({ i: i, gameBoard })
      })
    });
  } else if (gameBoard[column][i]) {
    return checkLines({ column: column + 1, i, gameBoard });
  } else {
    return checkLines({ column: 0, i: i - 1, gameBoard });
  }
}

export function clearLine({ i, column = 0, gameBoard }) {
  gameBoard[column][i] = 0;
  if (column === gameBoard.length - 1) {
    return gameBoard;
  } else {
    return clearLine({ i, column: column + 1, gameBoard });
  }
}

export function dropLines({ column = 0, i = 0, gameBoard }) {
  gameBoard[column][i + 1] = gameBoard[column][i];
  if (i === 0 && column === gameBoard.length - 1) {
    gameBoard[column][i] = 0;
    return gameBoard;
  } else if (i === 0) {
    gameBoard[column][i] = 0;
    return dropLines({ i, column: column + 1, gameBoard });
  } else if (column === gameBoard.length - 1) {
    return dropLines({ column: 0, i: i - 1, gameBoard });
  } else {
    return dropLines({ column: column + 1, i, gameBoard });
  }
}
