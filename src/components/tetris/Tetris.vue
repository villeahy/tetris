<template>
  <div>
    <h1>This is tetris</h1>
    <router-link to='/'>Hello</router-link>
    <br />
    <div v-for="line in tetris" :key="line.id">
      <div class='line' v-for="item in line.line" :key="item.id">
        <div class="field">x</div>
      </div>
    </div>
  </div>
</template>

<script>
const array = new Array(20).fill('row').map((el, i) => ({
  id: `${el}${i}`,
  line: new Array(10).fill(`${el}${i}`).map((el, i) => ({ id: `${el}-${i}` }))
}))
export default {
  name: 'tetris',
  data() {
    return { tetris: array }
  }
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
