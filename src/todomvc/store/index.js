import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { state, mutations } from './mutations'
import plugins from './plugins'

export default new Vuex.Store({
  plugins,
  mutations,
  state
})
