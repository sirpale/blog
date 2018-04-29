/**
 * @Author Sirpale
 * @Description 文章数据
 * @Date Created in 2018\4\29 0029
 */

export default {
  state: {
    loading: true,
    show: true,
    noData: '数据加载中',
    list: [],
    data : {
      id: null,
      name: '',
      title: '',
      content : '',
      isShow: true,
      tags: ['javascript'],
      intro: '',
      author: '',
      createTime: '',
      hits: 0,
      postNum : 0
    },
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['clean'],
      ['link', 'image', 'video']
    ]
  },
  mutations: {
    // 获取文章列表
    SET_LIST : (state, list) => {
      state.list = list
    },
    // 设置无数据提示信息
    SET_NO_DATA_MSG : (state, msg) => {
      state.noData = msg;
    },
    // 设置loading
    SET_LOADING : (state, loading) => {
      state.loading = loading
    },
    // 设置显示
    SET_SHOW: (state, show) => {
      state.show = show;
    },
    // 合并文章数据
    ASSIGN_DATA(state, data) {
      state.data = Object.assign(state.data, data);
    },
    // 清空数据
    CLEAR_DATA(state) {
      state.data = {
        id: null,
        name: '',
        title: '',
        content : '',
        isShow: true,
        tags: ['javascript'],
        intro: '',
        author: '',
        createTime: '',
        hits: 0,
        postNum : 0
      }
    }

  },
  actions : {

    setList({commit, rootState}, list) {
     commit('SET_LIST', list);
    },

    setNoData({commit, rootState}, msg) {
      commit('SET_NO_DATA_MSG', msg);
    },
    setLoading({commit}, loading) {
      commit('SET_LOADING', loading);
    },
    clearData({commit}) {
      commit('CLEAR_DATA');
    },
    assignData({commit}, data) {
      commit('ASSIGN_DATA', data);
    },
    setShow({commit}, show) {
      commit('SET_SHOW', show);
    }

  },
  getters: {

  },
  setters: {

  }
}
