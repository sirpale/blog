
export default {
  name: "home",
  components: {},
  data() {
    return {
      loading: true,
      imgs : [
        'http://newimg88.b0.upaiyun.com/newimg88/2018/03/1_2VqxkdyNCmWa8ojZZIoQOg.jpeg',
        // 'http://newimg88.b0.upaiyun.com/newimg88/2018/03/foreach.png',
        // 'http://newimg88.b0.upaiyun.com/newimg88/2018/03/1_sQy6GT_F86lYw6wrcZbQpA-1.png',
        // 'http://newimg88.b0.upaiyun.com/newimg88/2018/02/javascript-error.png'
      ],
      articleList : []
    }
  },
  methods: {
    handleSelect(key, keyPath) {},
    get_user_feedback(pagenum=null, page=1) {}
  },
  mounted() {

    let _this = this;
    _this.loading = false;


    // 获取文章列表
    _this.$http.get('/api/').then(v => {
      let dt = v.data;

      console.log(dt.data);

      _this.articleList = dt.data;
    })

  }
}
