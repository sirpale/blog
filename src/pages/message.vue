<template>
  <el-card class="box-card content-card">
    <el-form :ref="form" label-width="100px;">
      <el-form-item label="标题：">
        <el-input v-model="form.title" style="width:50%;"/>
      </el-form-item>
      <el-form-item label="内容：">
        <mavon-editor v-model="form.content" :ishljs = "true" style="height:400px;"/>
      </el-form-item>
      <el-form-item label="">
        <el-button type="success">提交</el-button>
      </el-form-item>
    </el-form>




  </el-card>
</template>

<style lang="scss" scoped>



</style>

<script>
  export default {
    name: "message",
    data() {
      return {
        form : {
          title: '',
          content: ''
        }
      }
    }
  }
</script>


