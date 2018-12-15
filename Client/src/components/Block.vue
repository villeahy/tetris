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
          return "gray";
        case 1:
          return "red";
        case 2:
          return "green";
        default:
          return "yellow";
      }
    }
  }
};
</script>

<style lang="css">

  .red, .green, .yellow, .gray {
    height: 30px;
    width: 30px;
  }

 .red{
   background: red;
 }
 .green{
   background: green;
 }
 .yellow{
   background: yellow;
 }
 .gray{
   background: #b4b4b4;
 }
</style>
