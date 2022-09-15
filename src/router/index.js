import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    redirect: '/',
    component: () => import('@/views/Layout'),
    children: [
      {
        path: '/',
        component: () => import('@/views/home')
      },
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home')
      },
      {
        path: '/home/list',
        component: () => import('@/views/homeList')
      },
      {
        path: '/home/news',
        component: () => import('@/views/homeNews')
      },
      {
        path: '/home/profile',
        component: () => import('@/views/profile')
      },

      {
        path: '/city',
        component: () => import('@/views/city')
      }
    ]
  },
  {
    path: '/favorite',
    component: () => import('@/views/favorite')
  },
  {
    path: '/rent/add',
    component: () => import('@/views/addRent')
  }
]

const router = new VueRouter({
  routes
})

export default router
