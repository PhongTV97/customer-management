import { createRouter, createWebHashHistory } from 'vue-router'
import { ROUTER_NAME, ROUTER_PATH } from '@/constants'
import HomePage from '@/pages/home/index.vue'

/**
 * Config redirect router
 */
const routes = [
  {
    path: ROUTER_PATH.ROOT,
    name: ROUTER_NAME.ROOT,
    component: HomePage
  },
  {
    path: ROUTER_PATH.HOME,
    name: ROUTER_NAME.HOME,
    component: HomePage
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_APP_BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next(ROUTER_PATH.HOME)
  } else {
    next()
  }
})

export default router
