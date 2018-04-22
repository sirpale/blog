export default {
  state : {
    isLogin : false,
    loginName: ''
  },
  mutations: {

    setLogin(state) {
      console.log('改变状态：', state.isLogin);
      state.isLogin = !state.isLogin
    },
    setName(state,name) {

      console.log(name);

      state.loginName = name
    }

  },
  actions: {
    setLogin({commit}) {
      commit('setLogin');
    },
    setName({commit, state}) {

      commit('setName');
    }
  },
  getters: {

  }
}
