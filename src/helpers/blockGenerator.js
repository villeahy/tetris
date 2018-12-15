export function blockGenerator(number) {
  switch (number) {
    case 0:
      return {
        value: 1,
        turn: 0,
        coords: [
          { row: 0, column: 4 },
          { row: -1, column: 4 },
          { row: 0, column: 5 },
          { row: -1, column: 5 }
        ]
      };
    case 1:
      return {
        value: 2,
        turn: 0,
        coords: [
          { row: -2, column: 4 },
          { row: -1, column: 4 },
          { row: 0, column: 4 },
          { row: 0, column: 5 }
        ]
      };
    case 2:
      return {
        value: 3,
        turn: 0,
        coords: [
          { row: -2, column: 5 },
          { row: -1, column: 5 },
          { row: 0, column: 4 },
          { row: 0, column: 5 }
        ]
      };
    case 3:
      return {
        value: 4,
        turn: 0,
        coords: [
          { row: -1, column: 4 },
          { row: -1, column: 5 },
          { row: 0, column: 5 },
          { row: 0, column: 6 }
        ]
      };
    case 4:
      return {
        value: 5,
        turn: 0,
        coords: [
          { row: -1, column: 5 },
          { row: -1, column: 6 },
          { row: 0, column: 4 },
          { row: 0, column: 5 }
        ]
      };
    case 5:
      return {
        value: 6,
        turn: 0,
        coords: [
          { row: -3, column: 4 },
          { row: -2, column: 4 },
          { row: -1, column: 4 },
          { row: 0, column: 4 }
        ]
      };
    case 6:
      return {
        value: 7,
        turn: 0,
        coords: [
          { row: -2, column: 4 },
          { row: -1, column: 4 },
          { row: -1, column: 5 },
          { row: 0, column: 4 }
        ]
      };
    default:
      return {
        value: 1,
        turn: 0,
        coords: [
          { row: 0, column: 4 },
          { row: -1, column: 4 },
          { row: 0, column: 5 },
          { row: -1, column: 5 }
        ]
      };
  }
}
