import Vue from 'vue'
import Vuex from 'vuex'
import chatStore from './modules/chatStore'
const debug = process.env.NODE_ENV !== 'production'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    // 这里放置你modules对应所有模块的store
    chatStore,
  },
  strict: debug,
})

type RootState = {
  globalInfo: any
}
