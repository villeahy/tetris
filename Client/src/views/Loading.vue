<template lang="html">
  <div class="waiting">
  <p class="waiting-text">Waiting for an opponent to join...</p>
  <p class="waiting-hint">(Try open a new tab/browser)</p>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="css">
  .waiting {
    background: #62ff00;
    border-radius: 10px;
    width: 50%;
    margin: calc(50vh - 75.2px) auto;
    padding: 20px;
    color: #009f00;
    font-weight: 600;
  }

  .waiting-text {
    animation: fadeInOut 1s infinite;
  }

  .waiting-hint {
    font-weight: lighter;
    font-size: 10px;
  }

  @keyframes fadeInOut {
  0%   { opacity:1; }
  50%  { opacity:0; }
  100% { opacity:1; }
}
</style>
