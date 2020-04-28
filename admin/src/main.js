import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import ElementUI from 'element-ui';
import './assets/css/index.css'
import 'element-ui/lib/theme-chalk/index.css';

// 默认请求地址
axios.defaults.baseURL = 'http://localhost:7000/'
// 拦截响应
axios.interceptors.response.use(res => {
  return res
}, err => {
  if (err.response.data.message) {
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
  }
})
// 把axios挂载到vue原型上
Vue.prototype.$axios = axios

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
