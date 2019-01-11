<template lang="html">
  <div class="wrapper">
    <gameboard-vue class="board" :board="ownBoard" />
    <gameboard-vue class="board" :board="opponentBoard" />
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
      ownBoard: [],
      ownStreak: 0,
      opponentBoard: [],
      opponentStreak: 0
    };
  },
  methods: {
    action: function(type) {
      socket.emit("action", { type }, this.callback);
    },
    callback: function(data) {
      Object.keys(data).forEach(key => {
        this[key] = data[key];
      });
    },
    mainHandler: function({ code }) {
      console.log(code);
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
  margin-top: 70px;
  padding: 5px;
  background: #6a6a6a;
  border-radius: 5px;
}
</style>
