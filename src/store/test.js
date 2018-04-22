export default {
  state : {

    count: 0,
    waiting: false
  },
  mutations: {
    INCREMENT(state) {
      console.log(state.count);
      state.count++;
    },
    DECREMENT(state){
      state.count--;
    },
    INCREMENT_WITH_VALUE(state, value) {
      state.count += value;
    },
    // 显示和隐藏waiting
    SHOW_WAITING_MESSAGE(state) {
      state.waiting = true;
    },
    HIDE_WAITING_MESSAGE(state) {
      state.waiting = false;
    }

  },
  actions: {
    increment({commit}) {

      commit('INCREMENT');
    },
    decrement({commit}) {
      commit('DECREMENT');
    },
    incrementWithValue({commit}, value) {
      commit('SHOW_WAITING_MESSAGE');
      setTimeout(() => {
        let intValue = parseInt(value);
        if(isNaN(intValue)) {
          throw '不是个整数'
        } else {
          commit('HIDE_WAITING_MESSAGE');
          commit('INCREMENT_WITH_VALUE',intValue);
        }
      },500);

    }


  },
  getters: {

  }
}
