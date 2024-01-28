import type { InvoicePrize } from '../types'
import { formateDate } from '../utils'
import { BaseApiService } from './api.service'

export class RaceApiService extends BaseApiService {
  private static readonly sellersUrl = 'sellers'
  private static readonly invoicesUrl = 'invoices'

  async getSellers() {
    try {
      const { data } = await this.get(RaceApiService.sellersUrl)

      return data
    } catch (error: any) {
      console.log(error)
    }
  }

  async createInvoice({ client, seller, items }: any): Promise<InvoicePrize | null> {
    try {
      const date = formateDate(new Date())

      const payload = {
        date,
        dueDate: date,
        client,
        seller,
        items,
      }

      const { data } = await this.post(RaceApiService.invoicesUrl, payload)

      return data
    } catch (error: any) {
      console.log(error)
      return null
    }
  }
}
