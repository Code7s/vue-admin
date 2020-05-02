import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/login/Login.vue'
import Register from '../views/login/Register.vue'

Vue.use(VueRouter)

// 路由规则
const routes = [
  { path: "/", component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
// to：将要访问的路径   from:从哪个路径跳转而来 next:继续
router.beforeEach((to, from, next) => {
  // 登录注册页直接放行
  if (to.path === '/login' || '/register') {
    return next()
  }
  const isToken = localStorage.getItem('token')
  if (!isToken) {
    return next('/login')
  }
  next()
})

export default router
