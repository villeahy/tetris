<template lang="html">
  <div :class="className">
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
    /*
    -webkit-clip-path: polygon(2% 16%, 6% 3%, 19% 3%, 80% 3%, 97% 6%, 96% 31%, 97% 91%, 88% 98%, 64% 98%, 19% 97%, 6% 96%, 3% 91%);
    clip-path: polygon(2% 16%, 6% 3%, 19% 3%, 80% 3%, 97% 6%, 96% 31%, 97% 91%, 88% 98%, 64% 98%, 19% 97%, 6% 96%, 3% 91%);
    overflow: hidden;
    */
    border: 5px solid currentColor;
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

 .background{
   background: #b4b4b4;
   border: 0.1px solid #ababab;
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
