

export default {
  name: "sub-article",
  data() {
    return {

      form : {
        name: '',
        title: '',
        content : '',
        isShow: true,
        tags: ['javascript'],
        intro: '',
        author: '',
        createTime: '',
        hits: 0,
        postNum : 0
      },
      idx: null,
      msg : '提示信息',
      show: false,
      editorOption: {
        height: '300px',
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ 'header': 1 }, { 'header': 2 }],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'script': 'sub' }, { 'script': 'super' }],
          [{ 'indent': '-1' }, { 'indent': '+1' }],
          [{ 'direction': 'rtl' }],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'font': [] }],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'align': [] }],
          ['clean'],
          ['link', 'image', 'video']
        ],
        syntax: {
          highlight: text => this.$hljs.highlightAuto(text).value
        }
      }
    }
  },
  mounted() {
    let _this = this;
    _this.form.name = _this.$store.state.login.loginName;

    _this.idx = _this.$router.history.current.query.id;

    console.log(this.idx);

    if(_this.idx) {
      // 获取指定文章
      _this.$http.get(`/api/getArticle?id=${_this.idx}`).then(v => {
        let dt = v.data;

        _this.loading = false;

        if(dt.status === 'success') {

          _this.form = {
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
          };

          console.log(_this.form);

        } else {
          _this.$router.push('/');
        }

      });
    }

  },
  updated() {

    console.log('更新');

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
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quill
    },
    contentCode() {
      return this.$hljs.highlightAuto(this.content).value
    }
  },
}
