<template>
  <div>
    <div>sers</div>
    <button v-on:click="test">See props</button>
  </div>
</template>

<script>
  export default {
    name: 'CoinDetails',
    methods: {
      test() {
        console.log(this.$attrs)
      }
    }
  }
</script>

<style scoped>

</style>