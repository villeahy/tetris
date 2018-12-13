import {
  blockGenerator,
  clearLine,
  dropLines,
  checkLines
} from '@/components/tetris/gameUtils'

test('block generator test', () => {
  expect(blockGenerator(0)).toMatchSnapshot()
  expect(blockGenerator(1)).toMatchSnapshot()
  expect(blockGenerator(2)).toMatchSnapshot()
  expect(blockGenerator(3)).toMatchSnapshot()
  expect(blockGenerator(4)).toMatchSnapshot()
  expect(blockGenerator(5)).toMatchSnapshot()
  expect(blockGenerator(6)).toMatchSnapshot()
  expect(blockGenerator('asd')).toMatchSnapshot()
})

test('testing clear line function', () => {
  const gameBoard = [[0, 0, 0, 6], [0, 0, 5, 2], [0, 0, 0, 8]]
  expect(clearLine({ i: 3, gameBoard })).toMatchSnapshot()
})

test('test drop lines function', () => {
  const gameBoard = [[0, 0, 2, 0], [0, 2, 2, 0], [2, 2, 2, 0]]
  expect(dropLines({ i: 2, gameBoard })).toMatchSnapshot()
})

test('test of checklines function', () => {
  const gameBoard = [[2, 2, 2, 0], [0, 2, 2, 0], [0, 0, 2, 0]]
  expect(checkLines({ gameBoard })).toMatchSnapshot()
})
