<template>
  <div id="MainPage">
    <div class="header">
      <h1>Welcome to Tetris!</h1>
      <p v-on:click="action">This game is a part of our project in the project course at Howest.
      We are a group of three international students from Poland, Finland and Norway.</p>
    </div>
    <nav>
      <ul>
        <router-link to='/tetris'><li class="play-btn">Play game</li></router-link>
      </ul>
    </nav>
  </div>
</template>

<script>
import socket from '../socket.js'
export default {
  name: 'Landing',
  data() {
    return {
      status: '',
      opponentBoard: [],
      ownBoard: []
    }
  },
  methods: {
    action: function() {
      socket.emit('action', { type: 'left' }, this.callback)
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
      socket.emit('newOpponent')
    })
    socket.on('gameStatus', status => {
      this.status = status
    })
    socket.on('action', board => {
      this.opponentBoard = board
    })
  },
  destroyed() {
    socket.disconnect()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#MainPage {
  background: url('../../assets/img/background-front-page.jpg') center;
  height: 100vh;
  padding: 1px;
}
.header {
  color: #4b6c77;
  margin-top: calc(50vh - 109.4px);
  padding: 10px;
  max-width: 500px;
  display: inline-block;
  margin: calc(50vh - 109.4px) 0 auto;
}

.play-btn {
  background-color: lightblue;
  display: inline-block;
  padding: 10px 20px;
  font-size: 1.5em;
  text-transform: capitalize;
  font-weight: bold;
  color: white;
  border-radius: 5px;
}

.play-btn a {
  text-decoration: none;
}

.play-btn:hover {
  color: #00d624;
  animation: toBig 0.1s ease-out forwards;
}

@keyframes toBig {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.2);
  }
}
</style>
