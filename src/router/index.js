import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
        {
    path: '/create',
    name: 'create',
    component: () => import('../views/create.vue')
  },
    {
    path: '/info',
    name: 'info',
    component: () => import('../views/info.vue')
  },
  // {
  //   path: '/header',
  //   name: 'header',
  //   component: () => import('../views/header.vue')
  // },
  // {
  //   path: '/banner',
  //   name: 'Banner',
  //   component: () => import('../views/Banner.vue')
  // },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
