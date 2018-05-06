import {mapState, mapActions} from 'vuex';
export default {
  name: "home",
  metaInfo () {
    return {
      title: this.pageName,
      meta: [{
        name: 'keywords',
        content: '盛吉祥的个人博客，发表日常记录，记录个人成长，工作经验总结，个人原创网站'
      }]
    }
  },
  components: {},
  data() {
    return {
      pageName: '首页-盛吉祥的博客',
      num : 6,
      diff: 6,
      sw: false,
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

      _this.uts.get(`${_this.urls.GET_ARTICLE_LIST}?num=${num}`, {}, res => {
        // 失败处理
        _this.setNoData('获取文章列表失败');
        _this.setLoading(false);
      }).then(d => {
        let dt = d && d.data ? d.data : {};
        if(dt.status === 'success') {
          if(num - _this.diff > dt.total ) {
            _this.sw = true;
          } else {
            if(dt.data.length === 0) {
              _this.setNoData('暂时没有发表文章');
              _this.sw = true;
            }
            _this.sw = false;
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

    // 鼠标滚动监听
    window.addEventListener('scroll',(e) => {
      // 可视区域高度
      let dHeight = document.documentElement.clientHeight || document.body.clientHeight;
      // 滚动高度
      let bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      //文档高度
      let docHeight = document.documentElement.offsetHeight || document.body.offsetHeight;

      // 判断是否滚动到底部
      if(bodyScrollTop + dHeight >= docHeight - 30) {
        // 判断
        if(!_this.sw) {
          setTimeout(_this.getMore, 1000);

        }
      }
    });
  }
}
