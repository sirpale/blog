/**
 * @Project blog
 * @Author Sirpale
 * @Description 编辑器数据
 * @Date Created in 2018\4\29 0029 by 20:49
 */


export default {
  state: {
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
        // highlight: text => this.$hljs.highlightAuto(text).value
      }
    }
  },
  mutations: {

  },
  actions: {

  },
  getters: {

  }
}
