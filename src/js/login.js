/**
 * 登录模块
 *
 * */

import {mapState,mapActions} from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      dialogFormVisible: this.$store.state.dialog.show,
      form: {
        name: '',
        password: '',
        repassword: '',
        question: '',
        answer: '',
        code : ''
      },
      formLabelWidth: '100px',
      activeName : 'login',
      isDisabled : false,
      host: '',
      urls: {
        login: '/api/login',
        reg: '/api/reg',
        logout: '/api/logout'
      },
      msg : {
        login: '登录失败',
        reg: '注册失败'
      },
      status: {
        login: false,
        reg: false
      },
      // isLogin: false,
      userInfo: {
        name : ''
      }
    }
  },
  mounted() {
    // 获取用户信息
    this.getUserInfo();
  },
  computed : {
    ...mapState({
      dialogShow : state => state.dialog,
      loginState: state => state.login
    })
  },
  methods: {
    ...mapActions({
      dialogOpen: 'switchDialog'
    }),
    getUserInfo() {
      let _this = this;

      _this.$http.get(this.urls.login).then(d => {

        let dt = d.data;

        // console.log(dt);

        if(dt.status === 'success') {
          _this.$store.commit('setLogin');
          _this.$store.commit('setName',dt.userInfo.name);
          _this.userInfo = dt.userInfo;
        }

      });
    },
    handleClick() {},
    resetForm() {
      this.$refs['form'].resetFields();
      console.log('重置成功');
    },
    // 表单重置
    formReset() {
      this.$refs['form'].resetFields();
      this.msg.reg = '';
      this.msg.login = '';
    },
    dialogClose (done) {
      done();
      this.formReset();
      // 设置弹窗关闭
      this.$store.state.dialog.show = false;
      console.log('关闭');

    },
    reg() {
      let _this = this;

      // 验证是否为空
      if(_this.form.name === '' ||
        _this.form.password === '' ||
          _this.form.repassword === '' ||
          _this.form.question === '' ||
          _this.form.answer === ''
      ) {
        _this.status.reg = true;
        _this.msg.reg = '以上内容不能为空！';
      } else {
        // console.log(_this.form);

        _this.$http.post(_this.urls.reg,_this.form).then( d => {

          let dt = d.data;

          // console.log(dt);

          if(dt.status === 'success') {
            _this.$store.commit('switchDialog');
            _this.$store.commit('setLogin');
            _this.userInfo = dt.data;
            _this.formReset();

            // sessionStorage.setItem("username",dt.data.name);
            // console.log(sessionStorage);
          } else {

            _this.status.reg = true;
            _this.msg.reg = dt.message
          }

        }, e => {
          console.log(e);
        }).catch( e => {
          console.log(e);
        })
      }

    },
    login() {
      let _this = this;

      _this.$http.post(_this.urls.login, _this.form).then( d => {

        let dt = d.data;
        if(dt.status === 'success') {

          // console.log(dt.data.name);

          _this.$store.commit('switchDialog');
          _this.status.login = false;
          _this.$store.commit('setLogin');
          _this.$store.commit('setName',dt.data.name);
          _this.userInfo = dt.data;
          _this.formReset();

          console.log(_this.$store.state.login.loginName);

          // 登录成功跳转到个人中心
          // location.href = '/user-home';
          // _this.$router.push({ path :`/user-home/${dt.data.name}`});
          _this.$router.push({ path :`/sub-article/${dt.data.name}`});

          // let h = _this.$createElement;
          // _this.$message({
          //   type: 'success',
          //   duration: 2000,
          //   message : h('p',null, [
          //     h('span', dt.message)
          //   ])
          // });
        } else {
          _this.status.login = true;
          _this.msg.login = dt.message;
        }

      }, e => {
        console.log(e);
        _this.status.login = true;
        _this.msg.login = `登录失败，错误原因：${e}`;
      }).catch(e => {
        console.log(e);
      });
    },
    logout() {
      let _this = this;
      _this.$http.get(_this.urls.logout).then(d => {
        console.log(d.data.message);
        _this.$store.commit('setLogin');

        // 退出成功跳转到首页
        // location.href = '/';
        _this.$router.push('/');
      });

    },
    jumpToUser(name) {
      this.$router.push(`/user-home/${name}`);
    }
  }
}
