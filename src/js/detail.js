export default {
  name: "detail",
  data() {
    return  {
      text: '文章详情页',
      article: {
        title: '',
        content: '',
        author: '',
        createTime: '',
        hits: 0,
        postNum : 0
      }
    }
  },
  mounted() {

    let _this = this;
    let aid = _this.$router.history.current.params.id;

    _this.$http.get(`/api/getArticle?id=${aid}`).then(v => {
      let dt = v.data;

      if(dt.status === 'success') {

        _this.article = {
          title: dt.data.title,
          content: dt.data.content,
          author: dt.data.author,
          createTime: dt.data['createTime'],
          hits: dt.data.hits,
          postNum : dt.data['postNum']

        }



      } else {
        _this.$router.push('/');
      }

    });
  }
}
