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
      }
    }
  },
  mounted() {
    let _this = this;
    _this.form.name = _this.$store.state.login.loginName;
  },
  methods: {
    subArticle() {
      let _this = this;

      _this.$http.post('/api/subarticle',_this.form).then( d => {
        let dt = d.data;

        console.log(dt);

      })
    }
  }
}
