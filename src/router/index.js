import { createRouter, createWebHistory } from 'vue-router'

import Inbox from '@/views/Inbox.vue'
import Login from '@/views/Login.vue'
import { userStore } from '../stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: Inbox
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
export default router

router.beforeEach(async (to) => {
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const auth = userStore()

  if (authRequired && !auth.user) {
    auth.returnUrl = to.fullPath
    return '/login'
  }
})
