import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import gb from './gb';
import dislogStore from './dialog-store';
import login from './login-store';
import menu from './menu-store';
import article from './article-store';
import editor from './editor-store';

export default new Vuex.Store({
  modules: {
    gb: gb,
    dialog: dislogStore,
    login: login,
    menu: menu,
    article: article,
    editor: editor
  }
});
