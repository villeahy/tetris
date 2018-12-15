<template lang="html">
  <div :class="className">
    x
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
 .red{
   color: red;
 }
 .green{
   color: green;
 }
 .yellow{
   color: yellow;
 }
 .gray{
   color: gray;
 }
</style>
