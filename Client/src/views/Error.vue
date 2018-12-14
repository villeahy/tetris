<template lang="html">
  <div>
    <p>Whoopsies error happened</p>
    <button @click="click">Try recover</button>
  </div>

</template>

<script>
import socket from '../components/socket.js'
export default {
  name: 'error',
  methods: {
    click: function() {
      socket.connect()
    }
  },
  mounted() {
    socket.disconnect()
  }
}
</script>

<style lang="css">
</style>
