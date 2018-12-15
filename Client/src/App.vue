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
import Landing from '@/views/Landing'
import Loading from '@/views/Loading'
import ErrorComp from '@/views/Error'
import Game from '@/views/Game'

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

html {
    background: linear-gradient(to bottom, #f9f9f9 0%,#d6d6d6 100%);
    height: 100vh;
}

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
