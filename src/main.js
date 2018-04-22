// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex, {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
// import VueResource from 'vue-resource'
import Axios from 'axios'
import App from './App'
import router from './router'
import store from './store';

import $ from 'jquery';

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './styles/base.scss';


Vue.use(ElementUI);
Vue.use(Vuex);

let Hub = new Vue();

Vue.prototype.bus = Hub;


Vue.prototype.$http = Axios;

Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});


