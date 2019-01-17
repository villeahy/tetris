<template lang="html">
    <div class="container">
      <div class="column" :key="i" v-for="(row, i) in board">
        <block-vue class="block" v-for="(cell, index) in row" :key="index" :type="cell" />
      </div>
      <div class="streak">
        <h1>Streak</h1>
        <slot name="streak"></slot>
      </div>
      <div class="cl-count">
        <h1>Cleared lines</h1>
        <slot name="cl-count"></slot>
      </div>
      <div class="prev">
        <h1>NEXT</h1>
        <div class="prev-1">
          <div class="column" :key="i" v-for="(row, i) in preview[0]">
            <block-vue class="block" v-for="(cell, index) in row" :key="index" :type="cell" />
          </div>
        </div>
        <div class="prev-2">
          <div class="column" :key="i" v-for="(row, i) in preview[1]">
            <block-vue class="block" v-for="(cell, index) in row" :key="index" :type="cell" />
          </div>
        </div>
        <div class="prev-3">
          <div class="column" :key="i" v-for="(row, i) in preview[2]">
            <block-vue class="block" v-for="(cell, index) in row" :key="index" :type="cell" />
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
  props: ["board", "preview"]
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

 .cl-count {
   position: absolute;
   bottom: 130px;
   right: -105px;
   font-size: 50px;
   font-weight: bold;
   color: white;
   border: 3px solid #6a6a6a;
   border-radius: 5px;
   background: #9b9b9b;
   padding: 5px 10px;
   z-index: -1;
   line-height: 1;
   color: lightgreen;
   text-align: right;
   padding-left: 100px;
   background: #6a6a6a;
 }

 .cl-count h1 {
   font-size: 13px;
   position: absolute;
   text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
   top: -25px;
   right: 0;

 }

 .streak {
   position: absolute;
   bottom: 0;
   right: -105px;
   font-size: 50px;
   font-weight: bold;
   color: white;
   border: 3px solid #6a6a6a;
   border-radius: 5px;
   padding: 5px 15px;
   padding-left: 100px;
   z-index: -2;
   line-height: 1;
   color: lightblue;
   background: #6a6a6a;
 }

 .streak h1 {
   font-size: 13px;
   position: absolute;
   right: 0;
   top: -25px;
   text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
 }

 .prev {
   font-size: 25px;
   position: absolute;
   top: 25px;
   border: 5px solid #6a6a6a;
   right: -105px;
   line-height: 0;
   background:  #6a6a6a;
   border-radius: 0px 5px 5px 0;
   z-index: -1;
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
