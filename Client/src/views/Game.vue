<template lang="html">
  <div class="wrapper">
    <div v-if="status === 'won' || status === 'lost'" id="page-mask"></div>
    <div>
      <h1>You</h1>
      <gameboard-vue class="board" :board="ownBoard" :preview="ownNextBlocks" >
        <template slot="streak"> {{ ownStreak }} </template>
        <template slot="cl-count"> {{ ownCL }} </template>
      </gameboard-vue>

    </div>
    <div>
      <h1>Opponent</h1>
      <gameboard-vue class="board" :board="opponentBoard" :preview="opponentNextBlocks">
        <template slot="streak"> {{ opponentStreak }} </template>
        <template slot="cl-count"> {{ opponentCL }} </template>
      </gameboard-vue>
    </div>
    <div v-if="status === 'won'" class="won">
      <h1>YOU WON!</h1>
    </div>
    <div v-if="status === 'lost'" class="lost">
      <h1>YOU LOST!</h1>
    </div>
  </div>
</template>

<script>
import socket from "@/components/socket.js";
import GameBoard from "@/components/GameBoard";

export default {
  name: "game",
  components: {
    "gameboard-vue": GameBoard
  },
  data() {
    return {
      status: "running",
      ownBoard: [],
      ownStreak: 0,
      ownCL: 0,
      ownNextBlocks: [],
      opponentBoard: [],
      opponentStreak: 0,
      opponentCL: 0,
      opponentNextBlocks: []
    };
  },
  methods: {
    action: function(type) {
      socket.emit("action", { type });
    },
    mainHandler: function({ code }) {
      switch (code) {
        case "ArrowLeft":
          this.action(code);
          break;
        case "ArrowRight":
          this.action(code);
          break;
        case "ArrowDown":
          this.action(code);
          break;
        case "ArrowUp":
          this.action(code);
          break;
        case "Space":
          this.action(code);
          break;
      }
    }
  },
  mounted() {
    document.addEventListener("keydown", this.mainHandler);
    socket.on("action", action => {
      Object.keys(action).forEach(key => {
        this[key] = action[key];
        if (action[key] === "won" || action[key] === "lost") {
          this.action("GameOver");
          document.removeEventListener("keydown", this.mainHandler);
        }
      });
    });
    this.action("Init");
  },
  destroyed() {
    this.action("GameOver");
    document.removeEventListener("keydown", this.mainHandler);
  }
};
</script>

<style scoped lang="css">

.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.board {
  padding: 5px;
  background: #6a6a6a;
  border-radius: 5px 0 0 5px;
  position: relative;
  line-height: 0;
  z-index: -1;
}

.won, .lost {
  position: absolute;
  z-index: 1;
  top: 30vh;
  padding: 150px;
  border-radius: 20px;
}

.won h1, .lost h1 {
  margin: 0;
}

.won {
  background: lightgreen;
  color: green;

}

.lost {
  background: #ff6666;
  color: darkred;
}

#page-mask {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

</style>
