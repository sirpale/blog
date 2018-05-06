/**
 * 登录模块
 *
 * */

import {mapState,mapActions} from 'vuex';
import LoginDialog from '@/components/login-dialog';

export default {
  name: 'Login',
  data() {
    return {
      activeName : 'login'
    }
  },
  components: {LoginDialog},
  mounted() {
    // 获取用户信息
    // this.getUserInfo();
  },
  computed : {
    ...mapState({
      show: state => state.gb.show,
      dialogShow: state => state.gb.dialogShow,
      isLogin: state => state.login.isLogin,
      loginName: state => state.login.loginName,
      host: state => state.login.host,
      userInfo: state => state.login.userInfo
    })
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    ...mapActions([
      'setDialogShow',
      'setLogin',
      'setName',
      'setUserInfo'
    ]),
    switchDialog() {
      this.setDialogShow(!this.dialogShow);
    },
    getUserInfo() {
      let _this = this, timer = null;
      _this.uts.get(this.urls.LOGIN,{}, res => {
        // 失败处理
        timer = setTimeout(() => {
          _this.getUserInfo();
        }, 10000);
      }).then(d => {
        let dt = d && d.data ? d.data : {};
        if(dt && dt.status === 'success') {
          _this.setLogin(true);
          _this.setName(dt.userInfo.name);
          _this.setUserInfo(dt.userInfo);
        }

        clearTimeout(timer);
      });
    },
    logout() {
      let _this = this;

      _this.uts.get(_this.urls.LOGOUT,{},res=>{}).then(d => {
        _this.setLogin(false);
        if(d.data.status === 'success') {
          _this.uts.notice('success',d.data.message);
          _this.setName('');
        } else {
          _this.uts.notice('error', d.data.message);
        }
        _this.$router.push('/');
      });

    }
  },
  watch : {
    isLogin : function(val, oldVal) {
      // console.log(val, oldVal);
    }
  }
}
