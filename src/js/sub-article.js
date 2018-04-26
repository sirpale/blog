export default {
  name: "sub-article",
  data() {
    return {

      form : {
        name: '',
        title: '',
        content : '',
        isShow: true,
        tags: ['javascript']
      },
      msg : '提示信息',
      show: false
    }
  },
  mounted() {
    let _this = this;
    _this.form.name = _this.$store.state.login.loginName;

    console.log('当前用户名：');
    console.log(_this.form.name);

    // if(_this.form.name === '') {
    //   _this.$router.push('/');
    // }
  },
  methods: {
    subArticle() {
      let _this = this;

      console.log('文章的参数：');
      console.log(_this.form);

      _this.$http.post('/api/subarticle',_this.form).then( d => {
        let dt = d.data;

        if(dt.status === 'success') {
          _this.$router.push('/');

          const h = _this.$createElement;

          this.$message({
            message: h('p',null,[
              h('span',null, dt.message)
            ])
          });

        } else {
          _this.msg = dt.message;
          _this.show = true;
        }

      })
    }
  }
}
