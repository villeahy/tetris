export default function({ value, coords, turn }) {
  switch (value) {
    case 5:
      if (turn) {
        coords[0].row = coords[0].row - 2;
        coords[3].column = coords[3].column - 1;
      } else {
        coords[0].row = coords[0].row + 2;
        coords[3].column = coords[3].column + 1;
      }
      return { value, coords, turn: (turn + 1) % 2 };
    default:
      return { value, coords, turn };
  }
}
