// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex, {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
// import VueResource from 'vue-resource'
import Axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
// import mavonEditor from 'mavon-editor';
import vueQuillEditor from 'vue-quill-editor'
import hljs from 'highlight.js'
import $ from 'jquery';

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'mavon-editor/dist/css/index.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import 'highlight.js/styles/monokai-sublime.css'

import './styles/base.scss';


Vue.use(ElementUI);
Vue.use(Vuex);
Vue.use(vueQuillEditor);
// Vue.use(mavonEditor,{
//   scrollStyle: true,
//   toolbars: {
//     bold: true, // 粗体
//     italic: true, // 斜体
//     header: true, // 标题
//     underline: true, // 下划线
//     strikethrough: true, // 中划线
//     mark: true, // 标记
//     superscript: true, // 上角标
//     subscript: true, // 下角标
//     quote: true, // 引用
//     ol: true, // 有序列表
//     ul: true, // 无序列表
//     link: true, // 链接
//     imagelink: true, // 图片链接
//     code: true, // code
//     table: true, // 表格
//     fullscreen: true, // 全屏编辑
//     readmodel: true, // 沉浸式阅读
//     htmlcode: true, // 展示html源码
//     help: true, // 帮助
//     /* 1.3.5 */
//     undo: true, // 上一步
//     redo: true, // 下一步
//     trash: true, // 清空
//     save: true, // 保存（触发events中的save事件）
//     /* 1.4.2 */
//     navigation: true, // 导航目录
//     /* 2.1.8 */
//     alignleft: true, // 左对齐
//     aligncenter: true, // 居中
//     alignright: true, // 右对齐
//     /* 2.2.1 */
//     subfield: true, // 单双栏模式
//     preview: true, // 预览
//   }
// });




let Hub = new Vue();

Vue.prototype.bus = Hub;
Vue.prototype.$http = Axios;
Vue.prototype.$hljs = hljs;

Vue.config.productionTip = false;


// 自定义指令
Vue.directive('hljs', {
  inserted(el) {
    // let blocks = el.querySelectorAll('pre code');

    // if(blocks.length > 0) {
    //   blocks.forEach(block => {
    //     hljs.highlightBlock(block);
    //   })
    // }

  }
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});


