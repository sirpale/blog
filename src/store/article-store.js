/**
 * @Author Sirpale
 * @Description 文章数据
 * @Date Created in 2018\4\29 0029
 */

export default {
  state: {
    idx: null,
    list: [],
    data : {
      id: null,
      name: '',
      title: '',
      content : '',
      cover: '',
      isShow: true,
      tags: ['javascript'],
      intro: '',
      author: '',
      createTime: '',
      hits: 0,
      postNum : 0
    }

  },
  mutations: {

    // 设置文章ID
    SET_ARTICLE_ID: (state, id) => {
      state.data.id = id;
    },
    // 首次获取文章列表
    SET_LIST : (state, list) => {
      state.list = list;
    },

    ADD_LIST: (state, list) => {
      state.list = [].concat(state.list, list);
    },


    // 设置显示
    SET_SHOW: (state, show) => {
      state.show = show;
    },
    // 合并文章数据
    ASSIGN_DATA(state, data) {

      data.tags = data.tags.split(',');

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
    setArticleID({commit}, id) {
      commit('SET_ARTICLE_ID', id);
    },

    setList({commit, rootState}, list) {
     commit('SET_LIST', list);
    },
    addList({commit}, list) {
      commit('ADD_LIST', list);
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
