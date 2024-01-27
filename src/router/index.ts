import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import { useAuthStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('../views/HomeView.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  // Redirecte to login page if user is not authenticated and trying to access a restricted page.
  const publicPages = ['/login']

  const authRequired = !publicPages.includes(to.path)

  const { isAuth } = useAuthStore()

  if (authRequired && !isAuth) {
    return next('login')
  } else if (!authRequired && isAuth) {
    return next('/')
  } else {
    return next()
  }
})

export default router
