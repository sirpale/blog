export default {
  state : {
    show: false,
    msg: '提交失败',
    isLogin : false,
    loginName: '',
    dialogFormVisible: false,
    form: {
      name: '',
      password: '',
      repassword: '',
      question: '',
      answer: '',
      code : ''
    },
    formLabelWidth: '100px',
    isDisabled : false,
    host: '',
    status: {
      login: false,
      reg: false
    },
    // isLogin: false,
    userInfo: {
      name : ''
    }
  },
  mutations: {

    SET_SHOW(state, show) {
      state.show = show;
    },
    SET_MSG(state, msg) {
      state.msg = msg;
    },
    SET_LOGIN(state, login) {
      state.isLogin = login
    },
    SET_NAME(state,name) {
      state.loginName = name
    },
    SET_USER_INFO(state, data) {
      state.userInfo = data;
    },
    SET_STATUS_LOGIN(state, login) {
      state.status.login = login;
    },
    SET_IS_LOGIN(state, login) {
      state.isLogin = login;
    },
    SET_STATUS_REG(state, reg) {
      state.status.reg = reg;
    }

  },
  actions: {
    setShow({commit}, show) {
      commit('SET_SHOW', show);
    },
    setMsg({commit}, msg) {
      commit('SET_MSG', msg);
    },
    setLogin({commit},login) {
      commit('SET_LOGIN', login);
    },
    setName({commit, state}, name) {
      commit('SET_NAME', name);
    },
    setUserInfo({commit}, data) {
      commit('SET_USER_INFO', data);
    },
    setStatusLogin({commit}, login) {
      commit('SET_STATUS_LOGIN', login);
    },
    setIsLogin({commit}, login) {
      commit('SET_IS_LOGIN', login);
    },
    setStatusReg({commit}, reg) {
      commit('SET_STATUS_REG', reg);
    }
  },
  getters: {

  }
}
