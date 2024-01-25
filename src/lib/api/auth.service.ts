import { BaseApiService } from './api.service'

export class AuthApiService extends BaseApiService {
  private static readonly url = 'login'

  async login(creedentials: { email: string; password: string }) {
    return this.post(AuthApiService.url, creedentials)
  }
}
