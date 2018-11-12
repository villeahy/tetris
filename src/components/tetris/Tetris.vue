<template>
  <div>
    <h1>This is tetris</h1>
    <router-link to='/'>Hello</router-link>
  </div>
</template>

<script>
export default {
  name: 'tetris'
}
</script>

<style scoped>
.field {
  display: inline-block;
  width: 2rem;
  border: 1px solid black;
}
.line {
  display: inline-block;
}
</style>
