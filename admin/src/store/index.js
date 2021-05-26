import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
let userInfo = JSON.parse(sessionStorage.getItem("userInfo")||'{}')

export default new Vuex.Store({
  state: {
    userInfo
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
