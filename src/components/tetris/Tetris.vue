<template>
  <div>
    <h1>This is tetris</h1>
    <router-link to='/'>Hello</router-link>
    <p>{{ currentI }} {{ currentcolumn}}</p>
    <div class="block" :key="i" v-for="(row, i) in gameBoard">
      <div v-for="(cell, index) in row" :key="index">{{ cell }}</div>
    </div>
  </div>
</template>

<script>
import { gameBoard } from './atetris.js'

export default {
  name: 'Tetris',
  data: function() {
    return {
      gameBoard: gameBoard,
      currentI: 0,
      currentcolumn: 4
    }
  },
  mounted: function() {
    document.addEventListener('keydown', this.mainHandler)
  },
  destroyed: function() {
    document.removeEventListener('keydown', this.mainHandler)
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
      this.gameBoard[this.currentcolumn][0] = 1
    },
    goLeft: function() {
      if (this.currentcolumn === 0) return
      if (this.gameBoard[this.currentcolumn - 1][this.currentI] === 2) return
      this.gameBoard[this.currentcolumn][this.currentI] = 0
      this.gameBoard[this.currentcolumn - 1][this.currentI] = 1
      this.currentcolumn--
    },
    goRight: function() {
      if (this.currentcolumn === 9) return
      if (this.gameBoard[this.currentcolumn + 1][this.currentI] === 2) return
      this.gameBoard[this.currentcolumn][this.currentI] = 0
      this.gameBoard[this.currentcolumn + 1][this.currentI] = 1
      this.currentcolumn++
    },
    move: function() {
      switch (this.gameBoard[this.currentcolumn][this.currentI + 1]) {
        case undefined:
          this.gameBoard[this.currentcolumn][this.currentI] = 2
          this.currentI = 0
          this.newBlock()
          break
        case 2:
          if (this.currentI === 0) return // Do something here....
          this.gameBoard[this.currentcolumn][this.currentI] = 2
          this.currentI = 0
          this.newBlock()
          break
        default:
          this.gameBoard[this.currentcolumn][this.currentI] = 0
          this.gameBoard[this.currentcolumn][this.currentI + 1] = 1
          this.currentI++
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
