import DecoratorPage from '@/views/DecoratorPage.vue'
import HomePage from '@/views/HomePage.vue'
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
Vue.use(VueRouter)

export const routes: Array<RouteConfig> = [
  {
    path: '',
    name: 'HomePage',
    meta: {},
    component: HomePage,
    children: [
      {
        path: '',
        name: 'DecoratorPage',
        meta: {},
        component: DecoratorPage,
      },
      {
        path: '/qrcode',
        name: 'QRCode',
        meta: {},
        component: () => import('../views/QrCodePage.vue'),
      },
      {
        path: '/processManage',
        name: 'ProcessManage',
        meta: {},
        component: () => import('../views/ProcessManagePage.vue'),
      },
      {
        path: '/bejson',
        name: 'BeJson',
        meta: {},
        component: () => import('../views/BeJsonPage.vue'),
      },
    ]
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
