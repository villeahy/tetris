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
        case 6:
            return "orange";
        default:
          return "yellow";
      }
    }
  }
};
</script>

<style lang="css">

  .red, .green, .yellow, .background, .blue, .purple, .orange {
    height: 30px;
    width: 30px;
  }

 .red{
   background: #c70000;
   border: 5px solid red;
 }
 .green{
   background: #04a404;
   border: 5px solid #00ef00;
 }
 .yellow{
   background: #d2d200;
   border: 5px solid yellow;
 }

 .background{
   background: #b4b4b4;
   border: 0.1px solid #ababab;
 }

 .blue {
   background: #0095ff;
   border: 5px solid #00c4ff;
 }

 .purple {
    background: #db02cb;
    border: 5px solid #ff40f0;
 }

 .orange {
   background: #dd8f00;
   border: 5px solid #ffbf00;
 }

</style>
