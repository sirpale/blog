import {mapState, mapActions} from 'vuex';
export default {
  name: "home",
  components: {},
  data() {
    return {}
  },
  computed: {
    ...mapState({
      list : state => state.article.list,
      loading: state => state.article.loading,
      show: state => state.article.show,
      timeout: state => state.article.timeout,
      noData: state => state.article.noData
    })
  },
  methods: {
    ...mapActions(['setNoData','setLoading', 'setList'])
  },
  created() {
    let _this = this;

    _this.uts.get(_this.urls.HOME, {}, res => { // 失败处理

      _this.setNoData('获取文章列表失败');
      _this.setLoading(false);

    }).then(d => {
        let dt = d.data;
        if(dt.status === 'success') {
          if(dt.data.length === 0) _this.setNoData('暂时没有发表文章');
          _this.setList(dt.data);
        }
        _this.setLoading(false);
    })

  },
  mounted() {
    let _this = this;
  }
}
