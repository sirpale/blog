<template>

  <el-card class="box-card content-card">
    <p v-show="!isLogin" style="text-align: center;width:100%;font-size:30px;padding:20px 0;color:#666;">
      <i class="el-icon-info"  >&nbsp;请先登录</i>
    </p>

      <el-form  :ref="form" label-width="" style="padding:20px 50px;">
        <!--<el-form-item label="标题：">-->
        <!--<el-input v-model="form.title" style="width:50%;"/>-->
        <!--</el-form-item>-->
        <el-form-item label="">
          <mavon-editor v-model="form.content" :ishljs = "true" style="height:400px;"/>
        </el-form-item>
        <el-form-item label="">
          <el-button v-show="isLogin" type="success" @click="sub" style="float:right;">提交留言</el-button>
        </el-form-item>
      </el-form>


  </el-card>
</template>

<style lang="scss" scoped>



</style>

<script>

  import {mapState} from 'vuex';

  export default {
    name: "message",
    data() {
      return {
        form : {
          title: '',
          content: ''
        }
      }
    },
    computed: {
      ...mapState({
        isLogin : state => state.login.isLogin
      })
    },
    methods: {
      sub() {
        if(this.form.content === '') {
          this.$message.error('请填写内容！')
        }

      }
    }
  }
</script>


