
import {mapState, mapActions} from 'vuex';

export default {
  name: "detail",
  data() {
    return  {
      text: '文章详情页'
    }
  },
  computed: {
    ...mapState({
      show: state => state.article.show,
      loading: state => state.article.loading,
      noData: state => state.article.noData,
      article: state => state.article.data
    })
  },
  methods: {
    ...mapActions(['assignData','clearData', 'setLoading', 'setNoData', 'setShow']),
    jumpToEdit(idx) {
      let _this = this;
      _this.$router.push({path:'/sub-article', query:{id:idx}});

    }
  },
  beforeCreate() {

  },
  created() {},
  beforeMount() {
    // 数据和状态初始化
    this.setLoading(true);
    this.setShow(true);
    this.clearData();
  },
  mounted() {
    let _this = this, id = _this.$router.history.current.params.id;
    _this.uts.get(`${_this.urls.GET_ARTICLE}?id=${id}`,{}, res => {
      _this.setNoData('获取内容失败！');
      _this.setLoading(false);
    }).then(d => {
      let dt = d.data;
      if(dt.status === 'success') {
        _this.assignData(dt.data);
        _this.setShow(false);
      }
      _this.setLoading(false);
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
  }

}
