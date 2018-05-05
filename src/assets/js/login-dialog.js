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
    let validateName = (rule, value, callback) => {

      if(value === '') {
        callback(new Error('请输入用户名'));
      }

      let reg = /^[a-zA-Z0-9_@]{4,20}$/;
      if (!reg.test(value)) {
        callback(new Error('只能包含字母、数字、_和@，4-20位'));
      }

      callback();
    };

    let validatePass = (rule, value, callback) => {

      if(value === '') {
        callback(new Error('请输入密码！'));
      }

      let reg = /^[\d\w]{6,20}$/;

      if(!reg.test(value)) {
        callback(new Error('6-20位'))
      }

      if(this.form.repassword !== '') {
        this.$refs.form.validateField('repassword')
      }


      callback();
    };

    let validateCheckPass = (rule, value, callback) => {

      if(value === '') {
        callback(new Error('请输入确认密码'));
      } else if(value !== this.form.password) {
        callback(new Error('确认密码和密码不一致'));
      } else {
        callback();
      }

    };


    return {
      activeName: 'login',
      rules: {
        name: [
          // {required: true, message: '请输入用户名', trigger: 'blur'},
          // {min: 4, max: 20, message: '长度在4到20个字符', trigger: 'change'},
          {validator: validateName, trigger: 'change'}
        ],
        password: [
          // {required: true, message: '请输入密码', trigger: 'blur,'},
          // {min: 6, max: 20, message: '长度在6到20个字符', trigger: 'change'},
          {validator: validatePass, trigger:'change'}
        ],
        repassword: [
          // {required: true, message:'请输入确认密码', trigger:'blur'},
          {validator: validateCheckPass, trigger:'change'}
        ],
        question: [
          {required: true, message:'请输入提示问题', trigger:'blur'}
        ],
        answer: [
          {required: true, message:'请输入问题答案', trigger:'blur'}
        ],
        code: [
          {required: true, message: '请输入验证码', trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    this.setCode(this.codeUrl);
  },
  mounted() {
  },
  computed: {
    ...mapState({
      show: state => state.gb.show,
      dialogShow: state => state.gb.dialogShow,
      msg: state => state.gb.msg,
      dialogFormVisible: state => state.login.dialogFormVisible,
      form: state => state.login.form,
      formLabelWidth: state => state.login.formLabelWidth,
      isDisabled: state => state.login.isDisabled,
      status: state => state.login.status,
      userInfo: state => state.login.userInfo,
      codeUrl: state => state.gb.codeUrl,
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
    handleClick() {
    },
    dialogClose(done) {

      this.formReset();
      // 设置弹窗关闭
      this.setDialogShow(false);
      this.setShow(false);
      this.setMsg('');
      // console.log('关闭');
      this.setCode(this.codeUrl);

      done();

    },
    reg() {
      let _this = this;

      // 验证是否为空
      if (_this.form.name === '' ||
        _this.form.password === '' ||
        _this.form.repassword === '' ||
        _this.form.question === '' ||
        _this.form.answer === '' ||
        _this.form.code === ''
      ) {
        _this.setShow(true);
        _this.setMsg('以上不得为空');

      } else {

        if (_this.form.password === _this.form.repassword) {
          _this.uts.post(_this.urls.REG, _this.form, res => { // 失败处理
            _this.setShow(true);
            _this.setMsg('注册失败，请稍后重试');
          }).then(d => {
            let dt = d.data;

            if (dt.status === 'success') {
              _this.setDialogShow(false);
              _this.setIsLogin(true);
              _this.setUserInfo(dt.data);
              _this.setStatusReg(true);
              _this.setMsg('');
              _this.formReset();
              _this.uts.notice('success', dt.message);
              _this.$router.push(`/sub-article`);
            } else {
              _this.setShow(true);
              _this.setMsg(dt.message);
              _this.setCode(this.codeUrl);
            }
          });
        } else {
          _this.setShow(true);
          _this.setMsg('确认密码和密码不一致！');
        }
      }
    },
    login() {
      let _this = this;

      console.log(_this.form);

      if (_this.form.name !== '' && _this.form.password !== '' && _this.form.code !== '') {
        _this.uts.post(_this.urls.LOGIN, _this.form, res => {

        }).then(d => {
          let dt = d.data;
          if (dt.status === 'success') {
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
            _this.setCode(this.codeUrl);
          }


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
