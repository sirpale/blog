import {mapState, mapActions} from 'vuex';
export default {
  name: "home",
  metaInfo: {
    title: '盛吉祥的博客-首页',
    meta: [{
      name: 'keywords',
      content: '盛吉祥的个人博客，发表日常记录，记录个人成长，工作经验总结，个人原创网站'
    }]

  },
  components: {},
  data() {
    return {
      num : 8,
      diff: 8,
      getMoreText: '+加载更多',
      getMoreShow: true,
      messages: [
        {
          name: '瞄不二',
          avaImg: '../assets/img/ava.jpg',
          content: '网站很简洁，风格清新，我很喜欢...',
          time: '12:23'
        },
        {
          name: '瞄不二',
          avaImg: '../assets/img/ava.jpg',
          content: '网站很简洁，风格清新，我很喜欢...',
          time: '12:23'
        },
        {
          name: '瞄不二',
          avaImg: '../assets/img/ava.jpg',
          content: '网站很简洁，风格清新，我很喜欢...',
          time: '12:23'
        },
        {
          name: '瞄不二',
          avaImg: '../assets/img/ava.jpg',
          content: '网站很简洁，风格清新，我很喜欢...',
          time: '12:23'
        },
        {
          name: '瞄不二',
          avaImg: '../assets/img/ava.jpg',
          content: '网站很简洁，风格清新，我很喜欢...',
          time: '12:23'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      loading: state => state.gb.loading,
      noData: state => state.gb.noData,
      list : state => state.article.list,
      show: state => state.article.show,
      timeout: state => state.article.timeout
    })
  },
  methods: {
    ...mapActions([
      'setNoData',
      'setLoading',
      'setList'
    ]),
    getArticle(num) {
      let _this = this;

      _this.uts.get(`${_this.urls.GET_ARTICLE_LIST}?num=${num}`, {}, res => { // 失败处理

        _this.setNoData('获取文章列表失败');
        _this.setLoading(false);

      }).then(d => {
        let dt = d.data;

        if(dt.status === 'success') {

          // console.log(num - _this.diff,dt.total);

          if(num - _this.diff > dt.total ) {
            _this.getMoreText = '没有更多了';
            _this.getMoreShow = false;
          } else {
            if(dt.data.length === 0) {
              _this.setNoData('暂时没有发表文章');
              _this.getMoreShow = false;
            }
            _this.setList(dt.data);
          }


        }
        _this.setLoading(false);
      })
    },
    getMore() {
      let num = this.num + this.diff;
      this.getArticle(num);
      this.num = num;
    }
  },
  created() {

    this.getArticle(this.num);

  },
  mounted() {
    let _this = this;
  }
}
