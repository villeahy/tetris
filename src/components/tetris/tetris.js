const row = [
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
  console.log(row.join('\n'))
}

function newBlock() {
  row[currentcolumn][0] = 1
}

function goLeft() {
  if (currentcolumn === 0) return
  if (row[currentcolumn - 1][currentI] === 2) return
  row[currentcolumn][currentI] = 0
  row[currentcolumn - 1][currentI] = 1
  currentcolumn--
}

function goRight() {
  if (currentcolumn === 9) return
  if (row[currentcolumn + 1][currentI] === 2) return
  row[currentcolumn][currentI] = 0
  row[currentcolumn + 1][currentI] = 1
  currentcolumn++
}

function move() {
  switch (row[currentcolumn][currentI + 1]) {
    case undefined:
      row[currentcolumn][currentI] = 2
      currentI = 0
      newBlock()
      break
    case 2:
      if (currentI === 0) throw Error('Game OVer')
      row[currentcolumn][currentI] = 2
      currentI = 0
      newBlock()
      break
    default:
      row[currentcolumn][currentI] = 0
      row[currentcolumn][currentI + 1] = 1
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
