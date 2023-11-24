<script>

export default {
  name: 'LoginError',
  props: {
    msg: String
  }
}
</script>

<template>
<div class="error errorAnim"><p>{{msg}}</p></div>
</template>

<style scoped>

</style>