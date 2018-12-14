<template lang="html">
  <div>
    Trying to recover from error
    if nothing happens try to reload page
  </div>

</template>

<script>
import socket from '../components/socket.js'
export default {
  name: 'error',
  mounted() {
    socket.disconnect()
    socket.connect()
  }
}
</script>

<style lang="css">
</style>
