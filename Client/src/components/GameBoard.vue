<template lang="html">
    <div class="container">
      <div class="column" :key="i" v-for="(row, i) in board">
        <block-vue class="block" v-for="(cell, index) in row" :key="index" :type="cell" />
      </div>
      <div class="streak">
        <h1>STREAK</h1>
        <slot name="streak"></slot>
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
    position: relative;
  }
 .column {
   display: inline-block;
 }

 .streak {
   position: absolute;
   bottom: 0;
   right: -60px;
   font-size: 50px;
   font-weight: bold;
   color: white;
   border: 3px solid #6a6a6a;
   border-radius: 5px;
   background: #9b9b9b;
   padding: 5px 15px;
   padding-left: 25px;
   z-index: -1;
 }

 .streak h1 {
   font-size: 13px;
   position: absolute;
   top: -26px;
   left: 12px;
   color: white;
   text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
 }

</style>
