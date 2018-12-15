<template lang="html">
  <div class="container">
    <div class="column" :key="i" v-for="(row, i) in board">
      <div class="field" v-for="(cell, index) in row" :key="index">{{ cell }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "gameboard",
  props: ["board"]
};
</script>

<style lang="css">
  .container {
    padding: 2rem;
    display: inline-block;
  }
 .column {
   padding: 3px;
   display: inline-block;
 }
</style>
