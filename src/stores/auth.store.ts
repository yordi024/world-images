import { AuthApiService } from '@/lib/api'
import { TOKEN_KEY } from '@/lib/constants'
import router from '@/router'
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isAuth = ref(false)

  const accessToken = useStorage(TOKEN_KEY, '')

  isAuth.value = !!accessToken.value

  async function login(creedentials: { email: string; password: string }) {
    const service = new AuthApiService()

    const { token } = await service.login(creedentials)

    accessToken.value = token

    isAuth.value = true

    router.push('/')
  }

  function logout() {
    accessToken.value = ''

    isAuth.value = false

    router.push('/login')
  }

  return {
    isAuth,
    login,
    logout,
  }
})
