<template lang="html">
    <div class="container">
      <div class="column" :key="i" v-for="(row, i) in board">
        <block-vue class="block" v-for="(cell, index) in row" :key="index" :type="cell" />
      </div>
      <div class="streak">
        <h1>STREAK</h1>
        <slot name="streak"></slot>
      </div>
      <div class="prev">
        <h1>NEXT</h1>
        <div class="prev-1">
          <div class="column" :key="i" v-for="i in 4">
            <block-vue class="block" v-for="index in 4" :key="index" :type="0" />
          </div>
        </div>
        <div class="prev-2">
          <div class="column" :key="i" v-for="i in 4">
            <block-vue class="block" v-for="index in 4" :key="index" :type="0" />
          </div>
        </div>
        <div class="prev-3">
          <div class="column" :key="i" v-for="i in 4">
            <block-vue class="block" v-for="index in 4" :key="index" :type="0" />
          </div>
        </div>
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
    font-size: 30px;
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
   color: lightblue;
   text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
 }

 .prev {
   font-size: 25px;
   position: absolute;
   top: 25px;
   border: 5px solid #6a6a6a;
   right: -105px;

 }

 .prev {
   line-height: 0;
   background:  #6a6a6a;
   opacity: 0.8;
   border-radius: 0px 5px 5px 0;
 }

 .prev-1, .prev-2  {
   margin-bottom: 5px;
 }

 .prev h1 {
   position: absolute;
   top: -30px;
   left: 4px;
   color: lightgreen;
   text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
   font-size: 20px;
 }


</style>
