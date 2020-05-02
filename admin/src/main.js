import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import './api/axios'
import './assets/css/index.css'
import './plugins/element.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
