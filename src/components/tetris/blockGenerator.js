export default function(number) {
  switch (number) {
    case 0:
      return [{ i: 0, y: 4 }, { i: -1, y: 4 }, { i: 0, y: 5 }, { i: -1, y: 5 }]
    case 1:
      return [{ i: -2, y: 4 }, { i: -1, y: 4 }, { i: 0, y: 4 }, { i: 0, y: 5 }]
    case 2:
      return [{ i: -2, y: 5 }, { i: -1, y: 5 }, { i: 0, y: 4 }, { i: 0, y: 5 }]
    case 3:
      return [{ i: -1, y: 4 }, { i: -1, y: 5 }, { i: 0, y: 5 }, { i: 0, y: 6 }]
    case 4:
      return [{ i: -1, y: 5 }, { i: -1, y: 6 }, { i: 0, y: 4 }, { i: 0, y: 5 }]
    case 5:
      return [{ i: -3, y: 4 }, { i: -2, y: 4 }, { i: -1, y: 4 }, { i: 0, y: 4 }]
    case 6:
      return [{ i: -2, y: 4 }, { i: -1, y: 4 }, { i: -1, y: 5 }, { i: 0, y: 4 }]
    default:
      return [{ i: 0, y: 4 }, { i: -1, y: 4 }, { i: 0, y: 5 }, { i: -1, y: 5 }]
  }
}
