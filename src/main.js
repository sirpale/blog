// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex, {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
// import VueResource from 'vue-resource'
import Axios from 'axios'
import App from './App'
import router from './router'
import store from './store'


import Utils from './assets/js/utils'
import Urls from './assets/js/urls'

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
// import 'highlight.js/styles/monokai-sublime.css'
import 'highlight.js/styles/default.css'

import '@/assets/css/base.scss';


Vue.use(ElementUI);
Vue.use(Vuex);
Vue.use(vueQuillEditor);

let Hub = new Vue();

Vue.prototype.bus = Hub;
Vue.prototype.$http = Axios;
Vue.prototype.urls = Urls;
Vue.prototype.uts = Utils;
Vue.prototype.$hljs = hljs;

Vue.config.productionTip = false;


// 自定义指令
Vue.directive('hljs', {
  inserted(el) {}
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});


