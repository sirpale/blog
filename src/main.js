// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex, {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
// import VueResource from 'vue-resource'
import Axios from 'axios'
import App from './App'
import router from './router'
import store from './store'

// import metaInfo from 'vue-meta-info'


import mavonEditor from 'mavon-editor';
import vueQuillEditor from 'vue-quill-editor'
import hljs from 'highlight.js'

import  {
  Button,
  Dialog,
  Input,
  Menu,
  MenuItem,
  Row,
  Col,
  Card,
  Tabs,
  TabPane,
  Tag,
  Form,
  FormItem,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Loading,
  Message,
  MessageBox,
  Notification,
  Upload
} from 'element-ui';

Vue.use(Button);
Vue.use(Dialog);
Vue.use(Input);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Checkbox);
Vue.use(Switch);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Upload);

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css';
import 'mavon-editor/dist/css/index.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// import 'highlight.js/styles/monokai-sublime.css'
import 'highlight.js/styles/default.css'

import '@/assets/css/base.scss';


import Utils from './assets/js/utils'
import Urls from './assets/js/urls'

// Vue.use(metaInfo);

Vue.use(Vuex);
Vue.use(vueQuillEditor);
Vue.use(mavonEditor);

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


