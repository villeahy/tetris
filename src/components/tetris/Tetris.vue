<template>
  <div>
    <h1>This is tetris</h1>
    <router-link to='/'>Hello</router-link>
  </div>
</template>

<script>
import { gameBoard } from './tetris'

export default {
  name: 'tetris',
  data: function() {
    return {
      gameBoard,
      currentI: 0,
      currentcolumn: 4
    }
  },
  methods: {
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
          newBlock()
          break
        case 2:
          if (currentI === 0) return
          //Do something here....
          this.gameBoard[this.currentcolumn][this.currentI] = 2
          this.currentI = 0
          newBlock()
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
.line {
  display: inline-block;
}
</style>
