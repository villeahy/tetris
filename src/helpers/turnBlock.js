export function turnBlock({ value, coords, turn }) {
  const [first, second, third, fourth] = coords;
  switch (value) {
    case 2:
      console.log("turn block case 2");
      if (turn === 1) {
        first.row++;
        first.column--;
        third.row--;
        third.column++;
        fourth.row--;
        fourth.row--;
      } else if (turn === 2) {
        first.column--;
        second.row++;
        third.column++;
        third.row++;
        third.row++;
        fourth.row++;
        fourth.column++;
        fourth.column++;
      } else if (turn === 3) {
        first.row--;
        first.row--;
        second.row--;
        second.column--;
        third.column--;
        third.column--;
        fourth.row++;
        fourth.column--;
      } else {
        first.row++;
        first.column++;
        first.column++;
        second.column++;
        third.row--;
        fourth.column--;
      }

      return {
        value,
        coords: [first, second, third, fourth],
        turn: (turn + 1) % 4
      };

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
        case 7:
          console.log("turn block case 7");
          if (turn === 0) {
            second.row--;
            second.column++;
            fourth.row = fourth.row - 2;
            fourth.column = fourth.column + 2;
          } else if (turn === 1) {
            second.row++;
            second.column++;
            first.row = first.row + 2;
            first.column = first.column + 2;
          } else if (turn === 2) {
            second.row++;
            second.column--;
            fourth.row = fourth.row + 2;
            fourth.column = fourth.column - 2;
          } else {
            first.row = first.row - 2;
            first.column = first.column - 2;
            second.row--;
            second.column--;
          }
          return {
            value,
            coords: [first, second, third, fourth],
            turn: (turn + 1) % 4
          };
    default:
      console.log("turn block default");
      return { value, coords, turn };
  }
}
