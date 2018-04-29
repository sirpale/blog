

export default {
  name: "detail",
  data() {
    return  {
      text: '文章详情页',
      article: {
        title: '',
        content: '',
        author: '',
        createTime: '',
        hits: 0,
        postNum : 0
      },
      loading: true
    }
  },
  beforeCreate() {
    // console.log('创建前');
  },
  created() {
    // console.log('创建');
  },
  beforeMount() {
    // console.log('挂载前');
  },
  mounted() {
    let _this = this;
    let aid = _this.$router.history.current.params.id;

    _this.$http.get(`/api/getArticle?id=${aid}`).then(v => {
      let dt = v.data;

      _this.loading = false;

      if(dt.status === 'success') {

        _this.article = {
          id: dt.data.id,
          title: dt.data.title,
          content: dt.data.content,
          intro: dt.data.intro,
          author: dt.data.author,
          createTime: dt.data['createTime'],
          hits: dt.data.hits,
          postNum : dt.data['postNum']
        };

        // Vue.directive('hljs', el => {
        //   let blocks = el.querySelectorAll('pre code');
        //
        //   console.log(blocks.length);
        // })



        // hljs.initHighlightingOnLoad();

      } else {
        _this.$router.push('/');
      }

    });
  },
  beforeUpdate() {
    // console.log('更新前');
  },
  updated() {

    let _this = this, blocks = document.querySelectorAll('pre');

    // hljs.configure({
    //   tabReplace: '    ', // 4 spaces
    //   classPrefix: ''     // don't append class prefix
    //                       // … other options aren't changed
    // });

    if(blocks && blocks.length > 0) {

      console.log(blocks.length);

      blocks.forEach( block => {
        _this.$hljs.highlightBlock(block);
      })
    }

    console.log('更新');
  },
  watch : {
    article : function(val, oldVal) {}
  },
  methods: {
    jumpToEdit(idx) {
      let _this = this;
      _this.$router.push({path:'/sub-article', query:{id:idx}});

    }

  }
}
