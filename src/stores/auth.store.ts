import { AuthApiService } from '@/lib/api'
import { TOKEN_KEY } from '@/lib/constants'
import router from '@/router'
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRaceStore } from './race.store'

export const useAuthStore = defineStore('auth', () => {
  const { clearState } = useRaceStore()

  const isAuth = ref(false)

  const accessToken = useStorage(TOKEN_KEY, '')

  isAuth.value = !!accessToken.value

  async function login(creedentials: { email: string; password: string }) {
    const service = new AuthApiService()

    const { token } = await service.login(creedentials)

    if (!token) throw new Error('Invalid credentials')

    accessToken.value = btoa(`${creedentials.email}:${token}`)

    isAuth.value = true

    router.push('/')
  }

  async function logout() {
    accessToken.value = ''

    isAuth.value = false

    await router.push('/login')

    clearState()
  }

  return {
    isAuth,
    login,
    logout,
  }
})
