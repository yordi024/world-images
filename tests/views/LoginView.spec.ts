import { setActivePinia, createPinia } from 'pinia'
import { VueWrapper, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import LoginView from '@/views/LoginView.vue'
import { AuthApiService } from '@/lib/api/auth.service'
import { TOKEN_KEY } from '@/lib/constants'
import { useAuthStore } from '@/stores/auth.store'

describe('LoginView', () => {
  let wrapper: VueWrapper
  let auth
  const token = 'token'
  beforeEach(() => {
    setActivePinia(createPinia())

    vi.spyOn(AuthApiService.prototype, 'login').mockReturnValue({
      token,
    })
    auth = useAuthStore()
    auth.logout()
    wrapper = mount(LoginView, {})
  })

  it('should render', () => {
    expect(wrapper.exists()).toBeTruthy()

    expect(wrapper.find('label[for="email"]').text()).toContain('Your email')

    expect(wrapper.find('label[for="password"]').text()).toContain('Password')

    expect(wrapper.find('input[id="email"]').exists()).toBeTruthy()

    expect(wrapper.find('input[id="password"]').exists()).toBeTruthy()

    expect(wrapper.find('button').exists()).toBeTruthy()
  })

  it('should submit form', async () => {
    const email = 'test@exmple.com'
    const password = 'password'

    await wrapper.find('input[id="email"]').setValue(email)
    await wrapper.find('input[id="password"]').setValue(password)

    expect(auth.isAuth).toBeFalsy()

    await wrapper.find('form').trigger('submit')

    expect(AuthApiService.prototype.login).toHaveBeenCalledWith({
      email,
      password,
    })

    const storedToken = localStorage.getItem(TOKEN_KEY)

    expect(storedToken).toBe(btoa(`${email}:${token}`))

    expect(auth.isAuth).toBeTruthy()
  })

  it('should not be authenticated when invalid creedential', async () => {
    vi.spyOn(AuthApiService.prototype, 'login').mockReturnValue({})

    await wrapper.find('input[id="email"]').setValue('invalid')
    await wrapper.find('input[id="password"]').setValue('invalid')

    expect(auth.isAuth).toBeFalsy()

    await wrapper.find('form').trigger('submit.prevent')

    expect(auth.isAuth).toBeFalsy()
  })
})
