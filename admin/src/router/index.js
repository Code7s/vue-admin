import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/Login.vue'
import Register from '../views/login/Register.vue'


Vue.use(VueRouter)

const routes = [
  { path: "/", redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register }
]

const router = new VueRouter({
  routes
})

export default router
