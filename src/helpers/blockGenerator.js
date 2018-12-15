export function blockGenerator(number) {
  switch (number) {
    case 0:
      return {
        value: 1,
        coords: [
          { i: 0, y: 4 },
          { i: -1, y: 4 },
          { i: 0, y: 5 },
          { i: -1, y: 5 }
        ]
      };
    case 1:
      return {
        value: 2,
        coords: [
          { i: -2, y: 4 },
          { i: -1, y: 4 },
          { i: 0, y: 4 },
          { i: 0, y: 5 }
        ]
      };
    case 2:
      return {
        value: 3,
        coords: [
          { i: -2, y: 5 },
          { i: -1, y: 5 },
          { i: 0, y: 4 },
          { i: 0, y: 5 }
        ]
      };
    case 3:
      return {
        value: 4,
        coords: [
          { i: -1, y: 4 },
          { i: -1, y: 5 },
          { i: 0, y: 5 },
          { i: 0, y: 6 }
        ]
      };
    case 4:
      return {
        value: 5,
        coords: [
          { i: -1, y: 5 },
          { i: -1, y: 6 },
          { i: 0, y: 4 },
          { i: 0, y: 5 }
        ]
      };
    case 5:
      return {
        value: 6,
        coords: [
          { i: -3, y: 4 },
          { i: -2, y: 4 },
          { i: -1, y: 4 },
          { i: 0, y: 4 }
        ]
      };
    case 6:
      return {
        value: 7,
        coords: [
          { i: -2, y: 4 },
          { i: -1, y: 4 },
          { i: -1, y: 5 },
          { i: 0, y: 4 }
        ]
      };
    default:
      return {
        value: 0,
        coords: [
          { i: 0, y: 4 },
          { i: -1, y: 4 },
          { i: 0, y: 5 },
          { i: -1, y: 5 }
        ]
      };
  }
}
