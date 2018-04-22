<template>
    <div id="foot">
      <p>{{msg}} &copy; {{date}}</p>
    </div>
</template>

<script>
  export default {
    name: "v-foot",
    data() {
      return {
        msg: 'blog',
        date: '2018'
      }
    }
  }
</script>

<style scoped>

  #foot {
    padding: 20px 0;
    color:#999;
  }

  p {
    text-align:center;
  }

</style>
