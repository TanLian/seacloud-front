<template>
  <div class='hi'>
    {{ message }}
  </div>
</template>

<script>
  export default {
    data () {
      return {
        message: '我来自变量哦！哈哈哈哈i哈哈'
      }
    },
    mounted () {
      this.$http.get('api/api/test_json').then((response) => {
        console.info(response.body)
      }, (response) => {
        console.error(response)
      })
    }
  }
</script>

<style>
  .hi {
    color: red;
    font-size: 20px;
  }
</style>
