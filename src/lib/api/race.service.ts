import { BaseApiService } from './api.service'

export class RaceApiService extends BaseApiService {
  private static readonly sellersUrl = 'sellers'

  async getSellers() {
    try {
      const { data: data } = await this.get(RaceApiService.sellersUrl)

      return data
    } catch (error: any) {
      console.log(error)
    }
  }
}
