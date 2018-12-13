<template lang="html">
  <div :class="className">
    x
  </div>
</template>

<script>
export default {
  name: 'block',
  props: ['type'],
  computed: {
    className: function() {
      switch (this.type) {
        case 'ready':
          return 'red'
        default:
      }
    }
  }
}
</script>

<style lang="css">
</style>
