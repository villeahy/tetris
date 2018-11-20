import blockGenerator from '@/components/tetris/blockGenerator'

test('works', () => {
  expect(blockGenerator(0)).toMatchSnapshot()
  expect(blockGenerator(1)).toMatchSnapshot()
  expect(blockGenerator(2)).toMatchSnapshot()
  expect(blockGenerator(3)).toMatchSnapshot()
  expect(blockGenerator(4)).toMatchSnapshot()
  expect(blockGenerator(5)).toMatchSnapshot()
  expect(blockGenerator(6)).toMatchSnapshot()
  expect(blockGenerator('asd')).toMatchSnapshot()
})
