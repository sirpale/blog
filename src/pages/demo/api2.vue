<template>
    <div>
      <el-button type="success" @click="eve">API2改变</el-button>
    </div>
</template>

<script>
  export default {
    name: "api2",
    methods: {
      eve() {
        this.bus.$emit('change', 'hahahaha')
      }
    }
  }
</script>

<style scoped>

  p {margin:10px 0;}

</style>
