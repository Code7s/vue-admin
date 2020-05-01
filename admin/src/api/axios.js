import Vue from 'vue'
import axios from 'axios'

// 设置默认请求根路径
axios.defaults.baseURL = 'http://localhost:7000/'

// 拦截请求
axios.interceptors.request.use(function (config) {
  // 如果token存在，给所有请求添加携带了token的响应头
  if (localStorage.token) {
    config.headers.Authorization = 'Bearer ' + (localStorage.token || '')
  }
  return config;
}, function (err) {
  return Promise.reject(err);
});

// 拦截响应
axios.interceptors.response.use(res => {
  return res
}, err => {
  if (err.response.data.message) {
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
    if (err.response.status === 401) {
      Vue.prototype.$router.push('/login')
    }
  }
})
// 把axios挂载到vue原型上
Vue.prototype.$axios = axios

export default axios