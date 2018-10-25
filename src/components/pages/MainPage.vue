<template>
  <div>
    <div class="header">
      <h1>Welcome to "insert tetris game name here"</h1>
      <p>This game is a part of our project in the project course at Howest.
      We are a group of three international students from Poland, Finland and Norway.</p>
    </div>
    <nav>
      <ul>
        <li><router-link to='/tetris'>Tetris</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  background: lightblue;
  padding: 20px;
}
</style>
