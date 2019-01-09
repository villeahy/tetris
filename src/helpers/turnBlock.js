function makeTurns({ value, coords, turn }, turns, board) {
  const [first, second, third, fourth] = coords;
  const check = Object.values(turns);
  try {
    if (
      coords.reduce((acc, obj, i) => {
        const column = obj.column + check[i][turn].column;
        const row = obj.row + check[i][turn].row;
        if (row < 0 && column > 0 && column < board.length) return acc;
        if (typeof board[column][row] !== "number") return false;
        if (board[column][row] > 0) return false;
        return acc;
      }, true)
    ) {
      first.row = first.row + turns.first[turn].row;
      first.column = first.column + turns.first[turn].column;
      second.row = second.row + turns.second[turn].row;
      second.column = second.column + turns.second[turn].column;
      third.row = third.row + turns.third[turn].row;
      third.column = third.column + turns.third[turn].column;
      fourth.row = fourth.row + turns.fourth[turn].row;
      fourth.column = fourth.column + turns.fourth[turn].column;
      return {
        block: {
          value,
          coords,
          turn: (turn + 1) % turns.first.length
        }
      };
    } else {
      return {
        block: {
          value,
          coords,
          turn
        }
      };
    }
  } catch (e) {
    return {
      block: {
        value,
        coords,
        turn
      }
    };
  }
}

export function turnBlock(block, board) {
  let turns;
  switch (block.value) {
    case 2:
      console.log("turn block case 2");
      turns = {
        first: [
          { row: 1, column: 2 },
          { row: 1, column: -1 },
          { row: 0, column: -1 },
          { row: -2, column: 0 }
        ],
        second: [
          { row: 0, column: 1 },
          { row: 0, column: 0 },
          { row: 1, column: 0 },
          { row: -1, column: -1 }
        ],
        third: [
          { row: -1, column: 0 },
          { row: -1, column: 1 },
          { row: 2, column: 1 },
          { row: 0, column: -2 }
        ],
        fourth: [
          { row: 0, column: -1 },
          { row: -2, column: 0 },
          { row: 1, column: 2 },
          { row: 1, column: -1 }
        ]
      };
      break;
    case 3:
      console.log("turn block case 3");
      turns = {
        first: [
          { row: 2, column: 1 },
          { row: 0, column: -1 },
          { row: -1, column: -1 },
          { row: -1, column: 1 }
        ],
        second: [
          { row: 1, column: 0 },
          { row: -1, column: 0 },
          { row: 0, column: 0 },
          { row: 0, column: 0 }
        ],
        third: [
          { row: 0, column: -1 },
          { row: -2, column: 1 },
          { row: 1, column: 1 },
          { row: 1, column: -1 }
        ],
        fourth: [
          { row: -1, column: 0 },
          { row: -1, column: 2 },
          { row: 2, column: 0 },
          { row: 0, column: -2 }
        ]
      };
      break;

    case 4:
      console.log("turn block case 4");
      turns = {
        first: [{ row: 0, column: 2 }, { row: 0, column: -2 }],
        second: [{ row: 0, column: 0 }, { row: 0, column: 0 }],
        third: [{ row: 0, column: 0 }, { row: 0, column: 0 }],
        fourth: [{ row: -2, column: 0 }, { row: 2, column: 0 }]
      };
      break;

    case 5:
      console.log("turn block case 5");
      turns = {
        first: [{ row: 0, column: 0 }, { row: 0, column: 0 }],
        second: [{ row: 0, column: -2 }, { row: 0, column: 2 }],
        third: [{ row: -2, column: 0 }, { row: 2, column: 0 }],
        fourth: [{ row: 0, column: 0 }, { row: 0, column: 0 }]
      };
      break;
    case 6:
      console.log("turn block case 6");
      turns = {
        first: [{ row: 3, column: 1 }, { row: -3, column: -1 }],
        second: [{ row: 2, column: 2 }, { row: -2, column: -2 }],
        third: [{ row: 1, column: 3 }, { row: -1, column: -3 }],
        fourth: [{ row: 0, column: 0 }, { row: 0, column: 0 }]
      };
      break;
    case 7:
      console.log("turn block case 7");
      turns = {
        first: [
          { row: 0, column: 0 },
          { row: 2, column: 2 },
          { row: 0, column: 0 },
          { row: -2, column: -2 }
        ],
        second: [
          { row: -1, column: 1 },
          { row: 1, column: 1 },
          { row: 1, column: -1 },
          { row: -1, column: -1 }
        ],
        third: [
          { row: 0, column: 0 },
          { row: 0, column: 0 },
          { row: 0, column: 0 },
          { row: 0, column: 0 }
        ],
        fourth: [
          { row: -2, column: 2 },
          { row: 0, column: 0 },
          { row: 2, column: -2 },
          { row: 0, column: 0 }
        ]
      };
      break;

    default:
      console.log("turn block default");
      return { block };
  }
  return makeTurns(block, turns, board);
}
