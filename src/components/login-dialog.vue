<template>
  <el-dialog title=""
             top="10px"
             width="40%"
             :visible.sync="dialogShow.show"
             :before-close="dialogClose"
  >
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="登录" name="login">
        <el-form :model="form" ref="form">
          <el-form-item label="用户名：" :label-width="formLabelWidth" prop="name">
            <el-input v-model.trim="form.name" auto-complete="off" />
          </el-form-item>
          <el-form-item label="密码：" :label-width="formLabelWidth" prop="password" >
            <el-input v-model.trim="form.password" auto-complete="off" type="password" />
          </el-form-item>
          <el-form-item label="验证码：" :label-width="formLabelWidth" prop="code">
            <el-input v-model.trim="form.code"  auto-complete="off"  style="width:50%;"/>
          </el-form-item>
          <el-form-item label="" :label-width="formLabelWidth">
            <el-button type="primary" @click="login" :disabled="isDisabled">登录</el-button>
            <span><a href="javascript:void(0);">忘记密码？</a></span>
          </el-form-item>
          <el-form-item label="" :label-width="formLabelWidth">
            <p class="sub-msg red" v-if="show" ref="msg">{{ msg }}</p>
          </el-form-item>

        </el-form>
      </el-tab-pane>
      <el-tab-pane label="注册" name="reg">
        <el-form :model="form" ref="form">
          <el-form-item label="用户名：" :label-width="formLabelWidth" prop="name">
            <el-input v-model.trim="form.name" auto-complete="off" />
          </el-form-item>
          <el-form-item label="密码：" :label-width="formLabelWidth" prop="password">
            <el-input v-model.trim="form.password" auto-complete="off" type="password" />
          </el-form-item>
          <el-form-item label="确认密码：" :label-width="formLabelWidth" prop="repassword">
            <el-input v-model.trim="form.repassword"  auto-complete="off" type="password" />
          </el-form-item>
          <el-form-item label="提示问题：" :label-width="formLabelWidth" prop="question">
            <el-input v-model.trim="form.question" auto-complete="off" />
          </el-form-item>
          <el-form-item label="问题答案：" :label-width="formLabelWidth" prop="answer">
            <el-input v-model.trim="form.answer" auto-complete="off" />
          </el-form-item>
          <el-form-item label="验证码：" :label-width="formLabelWidth" prop="code">
            <el-input v-model.trim="form.code"  auto-complete="off"  style="width:50%;"/>
          </el-form-item>
          <el-form-item label="" :label-width="formLabelWidth">
            <el-button type="success" @click="reg">注册</el-button>
            <!--<el-button @click="resetForm('fm')">重置</el-button>-->
          </el-form-item>
          <el-form-item label="" :label-width="formLabelWidth">
            <p class="sub-msg red" v-if="show" ref="msg">{{ msg }}</p>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>

  import {mapState, mapActions} from 'vuex';

  export default {
    name: "login-dialog",
    data() {
      return {
        activeName : 'reg'
      }
    },
    created() {},
    mounted() {},
    computed: {
      ...mapState({
        show: state => state.login.show,
        msg: state => state.login.msg,
        dialogShow : state => state.dialog,
        dialogFormVisible: state => state.login.dialogFormVisible,
        form: state => state.login.form,
        formLabelWidth: state=> state.login.formLabelWidth,
        isDisabled: state => state.login.isDisabled,
        status: state => state.login.status,
        userInfo: state => state.login.userInfo
      })

    },
    methods: {
      ...mapActions([
        'switchDialog',
        'setShow',
        'setMsg',
        'setName',
        'setUserInfo',
        'setStatusLogin',
        'setStatusReg',
        'setIsLogin'
      ]),
      handleClick() {},
      dialogClose (done) {
        done();
        this.formReset();
        // 设置弹窗关闭
        this.$store.state.dialog.show = false;
        console.log('关闭');

      },
      reg() {
        let _this = this;

        console.log(_this.form);

        // 验证是否为空
        if(_this.form.name === '' ||
          _this.form.password === '' ||
          _this.form.repassword === '' ||
          _this.form.question === '' ||
          _this.form.answer === ''
        ) {
          _this.setShow(true);
          _this.setMsg('以上内容不得为空');

        } else {

          _this.uts.post(_this.urls.REG,_this.form, res => { // 失败处理
            _this.setShow(true);
            _this.setMsg('注册失败，请稍后重试');
          }).then( d => {
            let dt = d.data;

            if(dt.status === 'success') {
              _this.switchDialog();
              _this.setIsLogin(true);
              _this.setUserInfo(dt.data);
              _this.setStatusReg(true);
              _this.setShow(false);
              _this.formReset();
              _this.uts.notice('success',dt.message);
              // _this.$router.push(`/user-home/${dt.data.name}`);

            }

           _this.setShow(true);
           _this.setMsg(dt.message);

          })
        }

      },
      login() {
        let _this = this;

        if(_this.form.name !== '' && _this.form.password !== '') {
          _this.uts.post(_this.urls.LOGIN,_this.form, res => {

          }).then(d => {
            let dt = d.data;
            if(dt.status === 'success') {
              _this.switchDialog();
              _this.setName(dt.data.name);
              _this.setUserInfo(dt.data);
              _this.setStatusLogin(true);
              _this.setShow(false);
              _this.setIsLogin(true);
              _this.formReset();
              _this.uts.notice('success', dt.message);
            }

            _this.setShow(true);
            _this.setMsg(dt.message);
          });
        } else {
          _this.setShow(true);
          _this.setMsg('用户名不得为空！');
        }
      },
      // 表单重置
      formReset() {
        this.$refs['form'].resetFields();
        this.setMsg('');
        // this.msg.login = '';
      },
      resetForm() {
        this.$refs['form'].resetFields();
        console.log('重置成功');
      },
    }
  }
</script>

<style scoped>

</style>
