export const gameBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]
let currentI = 0
let currentcolumn = 4

function print() {
  console.log('******')
  console.log(gameBoard.join('\n'))
}

function newBlock() {
  gameBoard[currentcolumn][0] = 1
}

function goLeft() {
  if (currentcolumn === 0) return
  if (gameBoard[currentcolumn - 1][currentI] === 2) return
  gameBoard[currentcolumn][currentI] = 0
  gameBoard[currentcolumn - 1][currentI] = 1
  currentcolumn--
}

function goRight() {
  if (currentcolumn === 9) return
  if (gameBoard[currentcolumn + 1][currentI] === 2) return
  gameBoard[currentcolumn][currentI] = 0
  gameBoard[currentcolumn + 1][currentI] = 1
  currentcolumn++
}

function move() {
  switch (gameBoard[currentcolumn][currentI + 1]) {
    case undefined:
      gameBoard[currentcolumn][currentI] = 2
      currentI = 0
      newBlock()
      break
    case 2:
      if (currentI === 0) thgameBoard Error('Game OVer')
      gameBoard[currentcolumn][currentI] = 2
      currentI = 0
      newBlock()
      break
    default:
      gameBoard[currentcolumn][currentI] = 0
      gameBoard[currentcolumn][currentI + 1] = 1
      currentI++
  }
}

print()
goLeft()
move()
goLeft()
move()
goRight()
print()
