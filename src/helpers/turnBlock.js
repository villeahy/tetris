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
    case 3:
      console.log("turn block case 3");
      if (turn === 1) {
        first.column--;
        second.row--;
        third.row--;
        third.row--;
        third.column++;
        fourth.row--;
        fourth.column++;
        fourth.column++;
      } else if (turn === 2) {
        first.row--;
        first.column--;
        third.row++;
        third.column++;
        fourth.row++;
        fourth.row++;
      } else if (turn === 3) {
        first.row--;
        first.column++;
        third.row++;
        third.column--;
        fourth.column--;
        fourth.column--;
      } else {
        first.row++;
        first.row++;
        first.column++;
        second.row++;
        third.column--;
        fourth.row--;
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
    default:
      console.log("turn block default");
      return { value, coords, turn };
  }
}
