export function turnBlock({ value, coords, turn }) {
  const [first, second, third, fourth] = coords;
  switch (value) {
    case 4:
      console.log("turn block case 4");
      if (turn) {
        first.column = first.column - 2;
        fourth.row = fourth.row + 2;
      } else {
        first.column = first.column + 2;
        fourth.row = fourth.row - 2;
      }
      return {
        value,
        coords: [first, second, third, fourth],
        turn: (turn + 1) % 2
      };
    case 5:
      console.log("turn block case 5");
      if (turn) {
        third.row = third.row + 2;
        second.column = second.column + 2;
      } else {
        third.row = third.row - 2;
        second.column = second.column - 2;
      }
      return {
        value,
        coords: [first, second, third, fourth],
        turn: (turn + 1) % 2
      };
      case 6:
        console.log("turn block case 6");
        if (turn) {
          second.row = second.row + 1;
          second.column = second.column - 1;
          third.row = third.row + 2;
          third.column = third.column -2;
          fourth.row = fourth.row + 3;
          fourth.column = fourth.column -3;
        } else {
          second.row = second.row - 1;
          second.column = second.column + 1;
          third.row = third.row - 2;
          third.column = third.column + 2;
          fourth.row = fourth.row - 3;
          fourth.column = fourth.column + 3;
        }
        return {
          value,
          coords: [first, second, third, fourth],
          turn: (turn + 1) % 2
        };
    default:
      console.log("turn block default");
      return { value, coords, turn };
  }
}
