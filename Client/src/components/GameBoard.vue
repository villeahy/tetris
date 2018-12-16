<template lang="html">
    <div class="container">
      <div class="column" :key="i" v-for="(row, i) in board">
        <block-vue class="block" v-for="(cell, index) in row" :key="index" :type="cell" />
      </div>
    </div>
</template>

<script>
import Block from "./Block";
export default {
  name: "gameboard",
  components: { "block-vue": Block },
  props: ["board"]
};
</script>

<style lang="css">

  .container {
    display: inline-block;
  }
 .column {
   display: inline-block;
 }

</style>
