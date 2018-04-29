import {mapState} from 'vuex';

export default {
  name: "sub-article",
  data() {
    return {
      idx: null,
      msg : '提示信息',
      show: false,
      editorOption: {
        height: '300px',
        toolbar: this.$store.state.article.toolbar,
        syntax: {
          highlight: text => this.$hljs.highlightAuto(text).value
        }
      }
    }
  },
  mounted() {

    let _this = this, _store = _this.$store;

    _this.form.name = _store.state.login.loginName;
    // _this.id = _this.$router.history.current.query.id;
    _store.dispatch('assignData',{id:_this.$router.history.current.query.id});

    console.log(_this.id);
    if(_this.id) {
      // 获取指定文章
      _this.$http.get(`/api/getArticle?id=${_this.id}`).then(v => {
        let dt = v.data;

        if(dt.status === 'success') {
          _store.dispatch('loading');

          _store.dispatch('assignData',{
            id: dt.data.id,
            title: dt.data.title,
            content: dt.data.content,
            intro: dt.data.intro,
            author: dt.data.author,
            isShow: dt.data.isShow,
            tags: dt.data.tags.split(','),
            createTime: dt.data['createTime'],
            hits: dt.data.hits,
            postNum : dt.data['postNum']
          });

        } else {
          _this.$router.push('/');
        }

      });

    } else {
      _store.dispatch('loading');
    }

  },
  computed: {
    ...mapState({
      loading: state => state.article.loading,
      id: state=> state.article.data.id,
      form : state => state.article.data
    }),
    editor() {
      return this.$refs.myTextEditor.quill
    },
    contentCode() {
      return this.$hljs.highlightAuto(this.content).value
    }
  },
  updated() {

    console.log('更新');

  },
  watch: {
    idx:  function () {
      console.log('监听的id:',this.idx);
    }
  },
  methods: {
    subArticle() {
      let _this = this;

      // console.log('文章的参数：');
      // console.log(_this.form);

      _this.$http.post('/api/subarticle',_this.form).then( d => {
        let dt = d.data;
        if(dt.status === 'success') {
          _this.$router.push('/');
          const h = _this.$createElement;
          _this.$message({
            message: h('p',null,[
              h('span',null, dt.message)
            ])
          });
        } else {
          _this.msg = dt.message;
          _this.show = true;
        }
      }).catch(e => {
        console.log(e);
      });
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
  }
}
