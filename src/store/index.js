import { createStore } from 'vuex'

export default createStore({
  state: {
    allCategories: []
  },
  mutations: {
    SET_CATEGORY_M(state, payload) {
      state.allCategories = payload;
    }
  },
  actions: {
    SET_CATEGORY_A({
      commit
    }, payload) {
      commit('SET_CATEGORY_M', payload);
    },
  },
  modules: {
  }
})
