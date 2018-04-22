import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import dislogStore from './dialog-store';
import login from './login-store';
import menu from './menu-store';

export default new Vuex.Store({
  modules: {
    dialog: dislogStore,
    login: login,
    menu: menu
  }
});
