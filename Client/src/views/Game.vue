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
      opponentBoard: []
    };
  },
  methods: {
    action: function(type) {
      socket.emit("action", { type }, this.callback);
    },
    callback: function(board) {
      this.ownBoard = board;
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
      }
    }
  },
  mounted() {
    document.addEventListener("keydown", this.mainHandler);
    socket.on("action", board => {
      this.opponentBoard = board;
    });
    this.action("Init");
  },
  destroyed() {
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
}
</style>
