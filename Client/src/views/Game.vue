<template lang="html">
  <div>
    <gameboard-vue :board="ownBoard" />
    <gameboard-vue :board="opponentBoard" />
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

<style lang="css">
</style>
