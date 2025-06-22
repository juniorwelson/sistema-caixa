import { createRouter, createWebHashHistory } from 'vue-router'
import vendas from '@/views/vendas.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: vendas
  },
  {
    path: '/resumoVendas',
    name: 'resumoVendas',
    
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/resumoVendas.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
