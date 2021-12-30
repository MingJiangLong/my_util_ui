import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import VConsole from 'vconsole';
// if (process.env.NODE_ENV === 'development') {
//   new VConsole();
// }
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
