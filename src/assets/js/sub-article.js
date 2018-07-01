import {mapState, mapActions} from 'vuex';
// import Editor from '@/components/editor';

export default {
  data() {
    return {
      coverUrl: location.port === '8080' ? 'http://localhost:3000/uploads/' : '../uploads/',
      uploadimg: location.port === '8080' ? '/api/uploadimg' : '/uploadimg',
      imageUrl: ''
      // canCrop: false,
      // // 测试上传接口，返回结构为(url:'')
      // uploadUrl: '/api/upload',
      // content: ''
    }
  },
  // components: {Editor},
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
    handleAvatarSuccess(res, file) {

      if(res.status === 'success') {
        this.$message.success(res.message);
      } else {
        this.$message.error(res.message);
      }

      console.log(file);

      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.cover = res.data.filename;
      // this.imageUrl = 'http://localhost:3000/'+ res.data.path;
    },
    beforeAvatarUpload(file) {
      const isType = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if(!isType) {
        this.$message.error('上传图片只能是jpg/png格式');
      }

      if(!isLt2M) {
        this.$message.error('上传图片大小不能超过2M');
      }

      return isType && isLt2M;

    },
    subArticle() {
      let _this = this;

      if (_this.name && _this.name !== '' && _this.form.content !== '') {

        console.log(_this.form);

        _this.uts.post(_this.urls.SUB_ARTICLE, _this.form, res => {
          // 错误处理
          _this.setShow(true);
          _this.setMsg('提交失败，请重试！');

        }).then(d => {
          let dt = d.data;
          if (dt.status === 'success') {
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
    if (!id) {
      _this.clearData();
      _this.setLoading(false);
    }

  },
  mounted() {

    let _this = this;

    // console.log('挂载之后的',_this.id);


    // 判断是否有存储的文章数据，没有就重新获取
    if (_this.id && _this.form.title === '') {
      _this.uts.get(`${_this.urls.GET_ARTICLE}?id=${_this.id}`, {}, res => {
        // 失败处理
      }).then(d => {
        let dt = d.data;

        if (dt.status === 'success') {
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
      if (!val) this.clearData();
    },
    name: function (val, oldVal) {
      // console.log(val, oldVal)
    }
  }

}
