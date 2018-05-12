import {mapState, mapActions} from 'vuex';
export default {
  name: "home",
  metaInfo () {
    return {
      // title: this.pageName
      // meta: [
      //   {
      //     name: 'keywords',
      //     content: '盛吉祥的个人博客，发表日常记录，记录个人成长，工作经验总结，个人原创网站'
      //   },
      //   {
      //     name: 'viewport',
      //     content: 'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no'
      //   },
      //   {
      //     name: 'description',
      //     content: '盛吉祥的个人博客，发表日常记录，记录个人成长，工作经验总结，个人原创网站'
      //   }
      // ]
    }
  },
  components: {},
  data() {
    return {
      pageName: '首页-盛吉祥的博客',
      dPage : 1,
      dSize: 10,
      page : 1,
      size : 10,
      total : 1,
      sw: true,
      messages: [
        {
          name: '瞄不二',
          avaImg: '../assets/img/ava.jpg',
          content: '网站很简洁，风格清新',
          time: '12:23'
        },
        {
          name: '瞄不二',
          avaImg: '../assets/img/ava.jpg',
          content: '想销毁还不容易，直接拿榔头杂碎了',
          time: '12:23'
        },
        {
          name: '瞄不二',
          avaImg: '../assets/img/ava.jpg',
          content: '这很流比啊 ， 赖(nai)流(niu)的流哈哈',
          time: '12:23'
        },
        {
          name: '瞄不二',
          avaImg: '../assets/img/ava.jpg',
          content: '终于搞懂了，之前改了好久改不好',
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
      timeout: state => state.article.timeout,
      searchShow: state => state.gb.searchShow,
      searchList: state => state.gb.searchList
    })
  },
  methods: {
    ...mapActions([
      'setNoData',
      'setLoading',
      'setList',
      'addList'
    ]),
    getArticle(page, size) {
      let _this = this;

      if(_this.sw) {

        if(_this.list.length < _this.total) {
          _this.uts.get(`${_this.urls.GET_ARTICLE_LIST}?page=${page}&size=${size}`, {}, res => {
            // 失败处理
            _this.setNoData('获取文章列表失败');
            _this.setLoading(false);
          }).then(d => {
            let dt = d && d.data ? d.data : {};

            if (dt.status === 'success') {

              if (dt.data.length === 0) {
                _this.setNoData('暂时没有发表文章');
                _this.sw = false;
              } else {
                _this.total = dt.total;

                if (_this.page <= 1) {
                  _this.setList(dt.data);
                } else {
                  _this.addList(dt.data);
                }

                if(_this.list.length === _this.total) _this.sw = false;

              }
            }
            _this.setLoading(false);
          });
        } else {
          _this.sw = false;
        }

      }
    },
    getMore() {
      ++this.page;
      this.getArticle(this.page, this.size);
    },
    scrollLoad() {

      let _this = this;
      // 可视区域高度
      let dHeight = document.documentElement.clientHeight || document.body.clientHeight;
      // 滚动高度
      let bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      //文档高度
      let docHeight = document.documentElement.offsetHeight || document.body.offsetHeight;

      // 判断是否滚动到底部
      if(bodyScrollTop + dHeight >= docHeight && !_this.searchShow) {
        setTimeout(()=>{
          _this.getMore(_this.page, _this.size);
        },300);
      }
    }
  },
  watch: {
    list : function(val, oldVal) {
      // console.log(val, oldVal);
    }
  },
  created() {
    let _this = this;

    _this.setList([]);
    this.getArticle(this.dPage, this.dSize);
    // 鼠标滚动监听
    window.addEventListener('scroll',_this.scrollLoad,false);
  },
  destroyed() {
    let _this = this;
    window.removeEventListener('scroll',_this.scrollLoad,false);
  },
  mounted() {}
}
