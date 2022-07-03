import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 重定向
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/views/Index'),
    children: [
      {
        path: '/home',
        component: () => import('@/views/Home')
      },
      {
        path: '/home/list',
        component: () => import('@/views/List')
      },
      {
        path: '/home/news',
        component: () => import('@/views/News')
      },
      {
        path: '/home/profile',
        component: () => import('@/views/Profile')
      },
      {
        path: '/home/city',
        component: () => import('@/views/City')
      }
    ]
  },
  {
    path: '/map',
    component: () => import('@/views/Map')
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  }
]

const router = new VueRouter({
  routes
})

export default router
