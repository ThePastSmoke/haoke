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
  },
  {
    path: '/registe',
    component: () => import('@/views/Registe')
  },
  {
    path: '/favorate',
    component: () => import('@/views/Favorate')
  },
  {
    path: '/city',
    component: () => import('@/views/City')
  }
]

const router = new VueRouter({
  routes
})

export default router
