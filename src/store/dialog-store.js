


export default {
  state: {
    show: false
  },
  mutations: {
    switchDialog(state) { // 这里的state对应上面的state
      state.show = !state.show;
    }
  },
  actions: {
    switchDialog(context) { // 这里的context和$store具有相同的功能
      context.commit('switchDialog');
    }
  },
  getters: { // 相当于vue 的computed
    notShow(state) { // 这里的state对应的上面的state
      return !state.show;
    }
  }
}
