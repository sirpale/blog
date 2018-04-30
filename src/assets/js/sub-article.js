import {mapState, mapActions} from 'vuex';

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState({
      editorOption: state => state.editor.editorOption,
      loading: state => state.gb.loading,
      show: state => state.gb.show,
      msg: state => state.gb.msg,
      id: state => state.article.data.id,
      name: state => state.login.loginName,
      form: state => state.article.data
    }),
    editor() {
      return this.$refs.myTextEditor.quill
    },
    contentCode() {
      // return this.$hljs.highlightAuto(this.content).value
    }
  },
  methods: {
    ...mapActions([
      'setShow',
      'setLoading',
      'assignData',
      'setMsg',
      'clearData',
      'setArticleID',
      'setIsDisabled'
    ]),
    subArticle() {
      let _this = this;

      if(_this.name && _this.name !== '') {

          _this.uts.post(_this.urls.SUB_ARTICLE, _this.form, res => {
            // 错误处理
            _this.setShow(true);
            _this.setMsg('提交失败，请重试！');

          }).then(d => {
            let dt = d.data;
            if(dt.status === 'success') {
              _this.setShow(false);
              _this.$router.push('/');
              _this.uts.notice('success', dt.message);
            } else {
              _this.setShow(true);
              _this.setMsg(dt.message);
            }
          });

      } else {
        _this.setShow(true);
        _this.setMsg('请先登录！');
      }
    },
    onEditorBlur(editor) {
      // console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      // console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      // console.log('editor ready!', editor)
    }
  },
  created() {
    let _this = this;
    let id = _this.$router.history.current.query.id;
    _this.setArticleID(id);

    // console.log('创建',id);


    // 判断是否有文章ID
    if(!id) {
      _this.clearData();
      _this.setLoading(false);
    }

  },
  mounted() {

    let _this = this;

    // console.log('挂载之后的',_this.id);


    // 判断是否有存储的文章数据，没有就重新获取
    if(_this.id && _this.form.title === '') {

      _this.uts.get(`${_this.urls.GET_ARTICLE}?id=${_this.id}`,{}, res => {
        // 失败处理
      }).then(d => {
        let dt = d.data;

        if(dt.status === 'success') {
          _this.setLoading(false);
          _this.assignData(dt.data);
        }
      })
    }
  },
  updated() {
    // let _this = this;
    // let id = _this.$router.history.current.query.id;
    //
    // console.log('更新',id);

  },
  watch: {
    id: function (val, oldVal) {
      if(!val) this.clearData();
    },
    name: function(val, oldVal) {
      // console.log(val, oldVal)
    }
  }

}
