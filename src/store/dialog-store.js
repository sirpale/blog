


export default {
  state: {
    show: false
  },
  mutations: {
    SWITCH_DIALOG(state) { // 这里的state对应上面的state
      state.show = !state.show
    }
  },
  actions: {
    switchDialog({commit}) { // 这里的context和$store具有相同的功能
      commit('SWITCH_DIALOG');
    }
  },
  getters: { // 相当于vue 的computed
    notShow(state) { // 这里的state对应的上面的state
      return !state.show;
    }
  }
}
