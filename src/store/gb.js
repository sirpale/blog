/**
 * @Project blog
 * @Author Sirpale
 * @Description 全局状态
 * @Date Created in 2018\4\29 0029 by 21:07
 */

export default {
  state: {
    loading: true,
    show: false,
    dialogShow: false,
    msg: '提示信息',
    noData: '数据加载中',
    isDisabled: true
  },
  mutations: {
    // 设置loading
    SET_LOADING : (state, loading) => {
      state.loading = loading
    },
    // 设置弹窗显示状态
    SET_DIALOG_SHOW(state, show) {
      state.dialogShow = show;
    },
    // 设置显示状态
    SET_SHOW(state, show) {
      state.show = show;
    },
    // 设置提示信息
    SET_MSG(state, msg) {
      state.msg = msg;
    },
    // 设置无数据提示信息
    SET_NO_DATA_MSG : (state, msg) => {
      state.noData = msg;
    },
    // 设置按钮状态
    SET_IS_DISABLED : (state, dis) => {
      state.isDisabled = dis;
    }

  },
  actions: {
    setLoading({commit}, loading) {
      commit('SET_LOADING', loading);
    },
    setDialogShow({commit}, show) {
      commit('SET_DIALOG_SHOW', show);
    },
    setShow({commit}, show) {
      commit('SET_SHOW', show);
    },
    setMsg({commit}, msg) {
      commit('SET_MSG', msg);
    },
    setNoData({commit, rootState}, msg) {
      commit('SET_NO_DATA_MSG', msg);
    },
    setIsDisabled({commit}, dis) {
      commit('SET_IS_DISABLED', dis);
    }

  },
  getters: {

  }
}
