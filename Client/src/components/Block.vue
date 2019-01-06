<template lang="html">
  <div :class="className">
    <div>

    </div>
  </div>
</template>

<script>
export default {
  name: "block",
  props: ["type"],
  computed: {
    className: function() {
      switch (this.type) {
        case 0:
          return "background";
        case 1:
          return "red";
        case 2:
          return "green";
        case 3:
          return "blue";
        case 4:
          return "purple";
        case 5:
          return "orange";
        case 10:
          return "ghost";
        default:
          return "yellow";
      }
    }
  }
};
</script>

<style lang="css">

  .block {
    height: 30px;
    width: 30px;
    border: .1px solid currentColor;
  }

  .block div {
    -webkit-clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    background-color: currentColor;
    height: 100%;
  }

  .background{
    background: #b4b4b4;
    color: #ababab;
  }

  .ghost {
    background: #ababab;
    color: #b4b4b4;
  }

 .red{
   background: #c70000;
   color: red;
 }
 .green{
   background: #04a404;
   color: #00ef00;
 }
 .yellow{
   background: #d2d200;
   color: yellow;
 }

 .blue {
   background: #0095ff;
   color: #00c4ff;
 }

 .purple {
    background: #db02cb;
    color: #ff40f0;
 }

 .orange {
   background: #dd8f00;
   color: #ffbf00;
 }

</style>
