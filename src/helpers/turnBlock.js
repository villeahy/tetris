function makeTurns({ value, coords, turn }, turns, board) {
  const [first, second, third, fourth] = coords;

  first.row = first.row + turns.first[turn].row;
  first.column = first.column + turns.first[turn].column;
  second.row = second.row + turns.second[turn].row;
  second.column = second.column + turns.second[turn].column;
  third.row = third.row + turns.third[turn].row;
  third.column = third.column + turns.third[turn].column;
  fourth.row = fourth.row + turns.fourth[turn].row;
  fourth.column = fourth.column + turns.fourth[turn].column;

  return [first, second, third, fourth];
}

export function turnBlock(block, board) {
  const { value, coords, turn } = block;
  let turns;
  switch (value) {
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

      return {
        value,
        coords: makeTurns(block, turns),
        turn: (turn + 1) % 4
      };

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

      return {
        value,
        coords: makeTurns(block, turns),
        turn: (turn + 1) % 4
      };

    case 4:
      console.log("turn block case 4");
      turns = {
        first: [{ row: 0, column: 2 }, { row: 0, column: -2 }],
        second: [{ row: 0, column: 0 }, { row: 0, column: 0 }],
        third: [{ row: 0, column: 0 }, { row: 0, column: 0 }],
        fourth: [{ row: -2, column: 0 }, { row: 2, column: 0 }]
      };
      return {
        value,
        coords: makeTurns(block, turns),
        turn: (turn + 1) % 2
      };

    case 5:
      console.log("turn block case 5");
      turns = {
        first: [{ row: 0, column: 0 }, { row: 0, column: 0 }],
        second: [{ row: 0, column: -2 }, { row: 0, column: 2 }],
        third: [{ row: -2, column: 0 }, { row: 2, column: 0 }],
        fourth: [{ row: 0, column: 0 }, { row: 0, column: 0 }]
      };

      return {
        value,
        coords: makeTurns(block, turns),
        turn: (turn + 1) % 2
      };

    case 6:
      console.log("turn block case 6");
      turns = {
        first: [{ row: 3, column: 1 }, { row: -3, column: -1 }],
        second: [{ row: 2, column: 2 }, { row: -2, column: -2 }],
        third: [{ row: 1, column: 3 }, { row: -1, column: -3 }],
        fourth: [{ row: 0, column: 0 }, { row: 0, column: 0 }]
      };
      return {
        value,
        coords: makeTurns(block, turns),
        turn: (turn + 1) % 2
      };
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
      return {
        value,
        coords: makeTurns(block, turns),
        turn: (turn + 1) % 4
      };
    default:
      console.log("turn block default");
      return { value, coords, turn };
  }
}
