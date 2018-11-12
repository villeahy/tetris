<template>
  <nav>
    <ul>
      <li><router-link to='/'>Hello</router-link></li>
      <li><router-link to='/tetris'>Tetris</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style scoped>
li {
  display: inline-block;
  margin: 20px;
}
ul {
  padding-inline-start: 0px;
  margin: 0px;
}
a {
  color: black;
  font-weight: bold;
  font-size: 1.4rem;
}
</style>
