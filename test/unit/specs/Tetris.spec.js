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
