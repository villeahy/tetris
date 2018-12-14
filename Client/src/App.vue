<template>
  <div id="app">
    <landing-vue v-if="status === 'joined'" />
    <loading-vue v-else-if="status === 'waiting'" />
    <game-vue v-else-if="status === 'ready'" />
    <error-vue v-else class="error" />

  </div>
</template>

<script>
import socket from './components/socket.js'
import Landing from '@/components/views/Landing'
import Loading from '@/components/views/Loading'
import ErrorComp from '@/components/views/Error'
import Game from '@/components/views/Game'

export default {
  name: 'App',
  components: {
    'landing-vue': Landing,
    'error-vue': ErrorComp,
    'loading-vue': Loading,
    'game-vue': Game
  },
  data() {
    return {
      status: 'joined',
      opponentBoard: [],
      ownBoard: []
    }
  },
  methods: {
    action: function() {
      console.log('action')
      socket.emit('action', { type: 'ArrowLeft' }, this.callback)
    },
    callback: function(board) {
      this.ownBoard = board
    }
  },
  mounted() {
    if (socket.disconnected) {
      socket.connect()
    }
    socket.on('opponentLeft', () => {
      socket.emit('newOpponent', status => {
        this.status = status
      })
    })
    socket.on('gameStatus', status => {
      this.status = status
    })
    socket.on('action', board => {
      console.log('action', board)
      this.opponentBoard = board
    })
    socket.on('connect_error', error => {
      console.log(error)
      this.status = 'error'
      socket.disconnect()
    })
  },
  destroyed() {
    socket.destroy()
  }
}
</script>

<style>
@import 'assets/css/normalize.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  box-sizing: border-box;
}

ul {
  list-style: none;
  padding-left: 0;
}
</style>
