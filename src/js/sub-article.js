import hljs from 'highlight.js';

export default {
  name: "sub-article",
  data() {
    return {

      form : {
        name: '',
        title: '',
        content : '',
        isShow: true,
        tags: ['javascript']
      },
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
          highlight: text => hljs.highlightAuto(text).value
        }
      }
    }
  },
  mounted() {
    let _this = this;
    _this.form.name = _this.$store.state.login.loginName;

    console.log('当前用户名：');
    console.log(_this.form.name);

    // if(_this.form.name === '') {
    //   _this.$router.push('/');
    // }
  },
  methods: {
    subArticle() {
      let _this = this;

      console.log('文章的参数：');
      console.log(_this.form);

      _this.$http.post('/api/subarticle',_this.form).then( d => {
        let dt = d.data;

        if(dt.status === 'success') {
          _this.$router.push('/');

          const h = _this.$createElement;

          this.$message({
            message: h('p',null,[
              h('span',null, dt.message)
            ])
          });

        } else {
          _this.msg = dt.message;
          _this.show = true;
        }

      })
    }
  }
}
