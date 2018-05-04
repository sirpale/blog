<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="修改密码" name="first">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="提示问题：">
          {{ form.question }}
        </el-form-item>
        <el-form-item label="提示答案：">
          <el-input v-model="form.answer"/>
        </el-form-item>
        <el-form-item label="原始密码：">
          <el-input v-model="form.password" />
        </el-form-item>
        <el-form-item label="新的密码：">
          <el-input v-model="form.newPassword" />
        </el-form-item>


        <el-form-item>
          <el-button type="danger" @click="">提交修改</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="修改信息" name="second">基本信息</el-tab-pane>
  </el-tabs>


</template>

<style scoped lang="scss">
  .el-input {width:50%;}
</style>

<script>


  export default {
    name: "user-set",
    data() {
      return {
        activeMenu: 'set',
        activeName: 'first',
        form : {
          password: '',
          newPassword : '',
          question: '1+1=?',
          answer: ''
        }
      }
    },

    methods: {
      handleClick(el) {
        // console.log(el);
      }
    }
  }
</script>

