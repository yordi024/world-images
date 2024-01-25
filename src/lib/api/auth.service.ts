import { BaseApiService } from './api.service'

export class AuthApiService extends BaseApiService {
  private static readonly url = 'login'

  async login(creedentials: { email: string; password: string }) {
    try {
      const { data: data } = await this.post(AuthApiService.url, creedentials)

      return data
    } catch (error: any) {
      console.log(error)
    }
  }
}
