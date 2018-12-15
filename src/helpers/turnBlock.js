export function turnBlock({ value, coords, turn }) {
  const [first, second, third, fourth] = coords;
  switch (value) {
    case 5:
      console.log("turn block case 5");
      if (!turn) {
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
