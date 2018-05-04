/**
 * @Project blog
 * @Author Sirpale
 * @Description
 * @Date Created in 2018\5\3 0003 by 8:23
 */

import {mapState, mapActions} from 'vuex';

export default {
  name: "login-dialog",
  data() {
    return {
      activeName : 'login'
    }
  },
  created() {
    this.setCode(this.codeUrl);
  },
  mounted() {},
  computed: {
    ...mapState({
      show: state => state.gb.show,
      dialogShow: state => state.gb.dialogShow,
      msg: state => state.gb.msg,
      dialogFormVisible: state => state.login.dialogFormVisible,
      form: state => state.login.form,
      formLabelWidth: state=> state.login.formLabelWidth,
      isDisabled: state => state.login.isDisabled,
      status: state => state.login.status,
      userInfo: state => state.login.userInfo,
      codeUrl : state => state.gb.codeUrl,
      code: state => state.gb.code
    })
  },
  methods: {
    ...mapActions([
      'setDialogShow',
      'setShow',
      'setMsg',
      'setName',
      'setUserInfo',
      'setStatusLogin',
      'setStatusReg',
      'setIsLogin',
      'setCode'
    ]),
    handleClick() {},
    dialogClose (done) {

      this.formReset();
      // 设置弹窗关闭
      this.setDialogShow(false);
      this.setShow(false);
      this.setMsg('');
      // console.log('关闭');

      done();

    },
    reg() {
      let _this = this;

      // 验证是否为空
      if(_this.form.name === '' ||
        _this.form.password === '' ||
        _this.form.repassword === '' ||
        _this.form.question === '' ||
        _this.form.answer === '' ||
        _this.form.code === ''
      ) {
        _this.setShow(true);
        _this.setMsg('以上不得为空');

      } else {

        if(_this.form.password === _this.form.repassword) {
          _this.uts.post(_this.urls.REG,_this.form, res => { // 失败处理
            _this.setShow(true);
            _this.setMsg('注册失败，请稍后重试');
          }).then( d => {
            let dt = d.data;

            if(dt.status === 'success') {
              _this.setDialogShow(false);
              _this.setIsLogin(true);
              _this.setUserInfo(dt.data);
              _this.setStatusReg(true);
              _this.setMsg('');
              _this.formReset();
              _this.uts.notice('success',dt.message);
              _this.$router.push(`/sub-article`);
            } else {
              _this.setShow(true);
              _this.setMsg(dt.message);
            }
          });

          _this.setCode(this.codeUrl);
        } else {

          _this.setShow(true);
          _this.setMsg('确认密码和密码不一致！');
        }


      }

    },
    login() {
      let _this = this;

      if(_this.form.name !== '' && _this.form.password !== '' && _this.form.code !== '') {
        _this.uts.post(_this.urls.LOGIN,_this.form, res => {

        }).then(d => {
          let dt = d.data;
          if(dt.status === 'success') {
            _this.setDialogShow(false);
            _this.setName(dt.data.name);
            _this.setUserInfo(dt.data);
            _this.setStatusLogin(true);
            _this.setShow(false);
            _this.setIsLogin(true);
            _this.formReset();
            _this.uts.notice('success', dt.message);
            // _this.$router.push(`/sub-article`);
          } else {
            _this.setShow(true);
            _this.setMsg(dt.message);
          }

          _this.setCode(this.codeUrl);
        });
      } else {
        _this.setShow(true);
        _this.setMsg('以上不得为空！');
      }
    },
    // 生成随机验证码
    randomCode() {
      this.setCode(this.codeUrl);
    },
    // 表单重置
    formReset() {
      this.$refs['form'].resetFields();
      this.setMsg('');
    },
    resetForm() {
      this.$refs['form'].resetFields();
      // console.log('重置成功');
    },
  }
}
