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

test('move left', () => {
  const Constructor = Vue.extend(Tetris)
  const vm = new Constructor().$mount()
  vm.block = [{ i: 2, y: 1 }]
  vm.gameBoard = [[0, 0, 0, 0], [0, 0, 0, 0]]
  expect(vm.block[0].y).toBe(1)
  vm.mainHandler({ code: 'ArrowLeft' })
  expect(vm.block[0].y).toBe(0)
  vm.mainHandler({ code: 'ArrowLeft' })
  expect(vm.block[0].y).toBe(0)
})

test('move right', () => {
  const Constructor = Vue.extend(Tetris)
  const vm = new Constructor().$mount()
  vm.gameBoard = [[0, 0, 0, 0], [0, 0, 0, 0]]
  vm.block = [{ i: 2, y: 0 }]
  expect(vm.block[0].y).toBe(0)
  vm.mainHandler({ code: 'ArrowRight' })
  expect(vm.block[0].y).toBe(1)
  vm.mainHandler({ code: 'ArrowRight' })
  expect(vm.block[0].y).toBe(1)
})

test('try to move side while blocked', () => {
  const Constructor = Vue.extend(Tetris)
  const vm = new Constructor().$mount()
  vm.block = [{ i: 2, y: 0 }]
  vm.gameBoard = [[0, 0, 0, 0], [0, 0, 2, 0]]
  expect(vm.block[0].y).toBe(0)
  vm.mainHandler({ code: 'ArrowRight' })
  expect(vm.block[0].y).toBe(0)
})

test('move down', () => {
  const Constructor = Vue.extend(Tetris)
  const vm = new Constructor().$mount()
  vm.block = [{ i: 2, y: 0 }]
  vm.gameBoard = [[0, 0, 0, 0]]
  expect(vm.block[0].i).toBe(2)
  vm.mainHandler({ code: 'ArrowDown' })
  expect(vm.block[0].i).toBe(3)
  vm.mainHandler({ code: 'ArrowDown' })
  expect(vm.gameBoard[0][3]).toBe(2)
})
