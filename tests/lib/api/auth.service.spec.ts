import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { AuthApiService } from '@/lib/api/auth.service'

describe('AuthApiService', () => {
  let authService: AuthApiService

  beforeEach(() => {
    setActivePinia(createPinia())
    authService = new AuthApiService()
  })

  it('should login successfully with correct credentials', async () => {
    const mockResponse = { token: 'fake-token' }
    vi.spyOn(authService, 'post').mockResolvedValue({ data: mockResponse })

    const credentials = { email: 'test@example.com', password: 'password' }
    const response = await authService.login(credentials)

    expect(response).toEqual(mockResponse)
  })

  it('should handle login error', async () => {
    const consoleSpy = vi.spyOn(console, 'log')
    vi.spyOn(authService, 'post').mockRejectedValue(new Error('Login failed'))

    const credentials = { email: 'test@example.com', password: 'wrong-password' }
    const response = await authService.login(credentials)

    expect(response).toBeUndefined()
    expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error))
  })
})
