<template>
  <div>
    <h1>This is tetris</h1>
    <router-link to='/'>Hello</router-link><br />
    <div class="block" :key="i" v-for="(row, i) in renderedGameBoard">
      <div v-for="(cell, index) in row" :key="index">{{ cell }}</div>
    </div>
  </div>
</template>

<script>
import { gameBoard } from './atetris.js'
function rightReducer(acc, block) {
  if (block.y === 9) return false
  return acc
}
function leftReducer(acc, block) {
  if (block.y === 0) return true
  return acc
}

export default {
  name: 'Tetris',
  data: function() {
    return {
      gameBoard: gameBoard,
      block: [{ i: -1, y: 4 }, { i: 0, y: 4 }, { i: -1, y: 5 }, { i: 0, y: 5 }]
    }
  },
  mounted: function() {
    document.addEventListener('keydown', this.mainHandler)
  },
  destroyed: function() {
    document.removeEventListener('keydown', this.mainHandler)
  },
  computed: {
    renderedGameBoard: function() {
      const currentBoard = [...this.gameBoard]
      this.block.forEach(obj => {
        if (obj.i >= 0) {
          if (currentBoard[obj.y][obj.i] !== 2) {
            currentBoard[obj.y][obj.i] = 1
          }
        }
      })
      return currentBoard
    }
  },
  methods: {
    mainHandler: function(e) {
      console.log(e.code)
      switch (e.code) {
        case 'ArrowLeft':
          this.goLeft()
          break
        case 'ArrowRight':
          this.goRight()
          break
        case 'ArrowDown':
          this.move()
          break
        default:
      }
    },
    newBlock: function() {
      this.block = [
        { i: 0, y: 4 },
        { i: -1, y: 4 },
        { i: 0, y: 5 },
        { i: -1, y: 5 }
      ]
    },
    moveDown: function() {
      const currentBoard = [...this.gameBoard]
      this.block.forEach(obj => {
        currentBoard[obj.y][obj.i] = 0
      })
      this.gameBoard = currentBoard
      this.block = this.block.map(obj => ({ ...obj, i: obj.i + 1 }))
    },
    moveSide: function(value) {
      this.block = this.block.map(obj => ({ ...obj, y: obj.y + value }))
    },
    checkLeft: function(acc, obj) {
      if (obj.i < 0) return acc
      if (this.gameBoard[obj.y - 1][obj.i] === 2) return true
      return acc
    },
    checkRight: function(acc, obj) {
      if (obj.i < 0) return acc
      if (this.gameBoard[obj.y + 1][obj.i] === 2) return true
      return acc
    },
    goLeft: function() {
      if (this.block.reduce(leftReducer, false)) return
      if (this.block.reduce(this.checkLeft, false)) return
      this.moveSide(-1)
    },
    goRight: function() {
      if (this.block.reduce(rightReducer, false)) return
      if (this.block.reduce(this.checkRight, false)) return
      this.moveSide(1)
    },
    setValues: function() {
      const newBoard = [...this.gameBoard]
      console.log(newBoard)
      this.block.forEach(obj => {
        newBoard[obj.y][obj.i] = 2
      })
      this.gameBoard = newBoard
    },
    downReducer: function(acc, obj) {
      if (typeof this.gameBoard[obj.y][obj.i + 1] === 'undefined') return 1
      if (this.gameBoard[obj.y][obj.i + 1] === 2) return 1
      return acc
    },
    move: function() {
      const value = this.block.reduce(this.downReducer, 2)
      console.log(value)
      switch (value) {
        case 1:
          this.setValues()
          this.newBlock()
          break
        case 2:
          this.moveDown()
          break
        default:
          this.moveDown()
          break
      }
    }
  }
}
</script>

<style scoped>
.field {
  display: inline-block;
  width: 2rem;
  border: 1px solid black;
}
.block {
  display: inline-block;
}
</style>
