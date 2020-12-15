import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/login/Login.vue'
import Register from '../views/login/Register.vue'
import Welcome from '../views/main/Welcome.vue'
import UserList from '../views/main/UserList'
import Roles from '../views/main/Roles'
import Power from '../views/main/Power'
import GoodsList from '../views/main/GoodsList'
import SortArg from '../views/main/SortArg'
import GoodsArg from '../views/main/GoodsArg'
import OrderList from '../views/main/OrderList'
import Statistics from '../views/main/Statistics'

Vue.use(VueRouter)

// 路由规则
const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: "/home",
    component: Home,
    redirect:'/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/userlist', component: UserList },
      { path: '/roles', component: Roles },
      { path: '/power', component: Power },
      { path: '/goodslist', component: GoodsList },
      { path: '/sortarg', component: SortArg },
      { path: '/goodsarg', component: GoodsArg },
      { path: '/orderlist', component: OrderList },
      { path: '/statistics', component: Statistics },
    ]
  },
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
