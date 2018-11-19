import Vue from 'vue'
import Tetris from '@/components/tetris/Tetris'

test('renders with empty gameBoard', () => {
  const Constructor = Vue.extend(Tetris)
  const vm = new Constructor().$mount()
  expect(vm.gameBoard).toMatchSnapshot()
})

test('block did mount', () => {
  const Constructor = Vue.extend(Tetris)
  const vm = new Constructor()
  vm.newBlock = jest.fn(() => {})
  vm.$mount()
  expect(vm.newBlock).toHaveBeenCalledTimes(1)
})

test('block have right length', () => {
  const Constructor = Vue.extend(Tetris)
  const vm = new Constructor().$mount()
  expect(vm.block).toHaveLength(4)
})

test('downReducer test', () => {
  const Constructor = Vue.extend(Tetris)
  const vm = new Constructor().$mount()
  expect(vm.downReducer(2, { y: 4, i: 0 })).toBe(2)
  expect(vm.downReducer(2, { y: 4, i: 19 })).toBe(1)
})

test('checkLeft test', () => {
  const Constructor = Vue.extend(Tetris)
  const vm = new Constructor().$mount()
  vm.gameBoard = [[0, 0, 0, 2], [0, 0, 0, 0]]
  expect(vm.checkLeft(false, { y: 2, i: 3 })).toBe(false)
  expect(vm.checkLeft(false, { y: 1, i: 3 })).toBe(true)
})

test('checkRight test', () => {
  const Constructor = Vue.extend(Tetris)
  const vm = new Constructor().$mount()
  vm.gameBoard = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 2]
  ]
  expect(vm.checkRight(false, { y: 2, i: 3 })).toBe(false)
  expect(vm.checkRight(false, { y: 8, i: 3 })).toBe(true)
})
