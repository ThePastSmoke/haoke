import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    city: {
      cityName: '北京',
      cityCode: 'AREA|88cff55c-aaa4-e2e0'
    }
  },
  getters: {},
  mutations: {
    city(state, newval) {
      state.city = newval
    }
  },
  actions: {},
  modules: {}
})
