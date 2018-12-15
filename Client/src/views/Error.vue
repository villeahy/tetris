<template lang="html">
  <div class="error">
    <p>Whoopsies an error occured</p>
    <button @click="click">Try again</button>
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

<style scoped lang="css">
.error {
  background: #a60000;
  border-radius: 10px;
  width: 50%;
  margin: calc(50vh - 75.2px) auto;
  padding: 20px;
  color: #ff0000;
  font-weight: 600;
}
</style>
