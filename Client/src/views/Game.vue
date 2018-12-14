<template lang="html">
  <div>
    <gameboard-vue :board="ownBoard" />
    <gameboard-vue :board="opponentBoard" />
  </div>
</template>

<script>
import socket from '@/components/socket.js'
import GameBoard from '@/components/GameBoard'
export default {
  name: 'game',
  components: {
    'gameboard-vue': GameBoard
  },
  data() {
    return {
      ownBoard: [],
      opponentBoard: []
    }
  },
  methods: {
    action: function(type) {
      console.log('action')
      socket.emit('action', { type }, this.callback)
    },
    callback: function(board) {
      this.ownBoard = board
    }
  },
  mounted() {
    socket.on('action', board => {
      console.log('action')
      this.opponentBoard = board
    })
    this.action('Init')
  }
}
</script>

<style lang="css">
</style>
