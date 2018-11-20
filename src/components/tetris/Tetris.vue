<template>
  <div>
    <h1>This is tetris</h1>
    <router-link to='/'>Hello</router-link><br />
    <div class="block" :key="i" v-for="(row, i) in renderedGameBoard">
      <div class="field" v-for="(cell, index) in row" :key="index">{{ cell }}</div>
    </div>
  </div>
</template>

<script>
import { gameBoard } from './gameBoard.js'
import blockGenerator from './blockGenerator.js'

export default {
  name: 'Tetris',
  data: function() {
    return {
      gameBoard: gameBoard,
      block: []
    }
  },
  mounted: function() {
    document.addEventListener('keydown', this.mainHandler)
    this.newBlock()
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
          this.moveSide(-1)
          break
        case 'ArrowRight':
          this.moveSide(1)
          break
        case 'ArrowDown':
          this.move()
          break
        default:
      }
    },
    newBlock: function() {
      this.block = blockGenerator(Math.floor(Math.random() * 7))
    },
    moveDown: function() {
      this.block.forEach(obj => {
        this.gameBoard[obj.y][obj.i] = 0
      })
      this.block = this.block.map(obj => ({ ...obj, i: obj.i + 1 }))
    },
    moveSide: function(value) {
      const side = value === -1 ? 0 : this.gameBoard.length - 1
      if (
        this.block.reduce((acc, block) => {
          if (block.y === side) return true
          return acc
        }, false)
      ) {
        return
      }
      if (
        this.block.reduce((acc, obj) => {
          if (obj.i < 0) return acc
          if (this.gameBoard[obj.y + value][obj.i] === 2) return true
          return acc
        }, false)
      ) {
        return
      }
      this.block.forEach(obj => {
        this.gameBoard[obj.y][obj.i] = 0
      })
      this.block = this.block.map(obj => ({ ...obj, y: obj.y + value }))
    },
    setValues: function() {
      this.block.forEach(obj => {
        this.gameBoard[obj.y][obj.i] = 2
      })
    },
    move: function() {
      switch (
        this.block.reduce((acc, obj) => {
          if (obj.i < 0) return acc
          if (typeof this.gameBoard[obj.y][obj.i + 1] === 'undefined') return 1
          if (this.gameBoard[obj.y][obj.i + 1] === 2) return 1
          return acc
        }, 2)
      ) {
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
.block {
  display: inline-block;
}

.field {
  padding: 5px;
  border: red 2px solid;
}
</style>
