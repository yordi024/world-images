import type { AxiosInstance, AxiosResponse } from 'axios'
import type { BaseApiServiceInterface } from './api.types'
import HttpClient from '../wrappers/http.wrapper'

export class BaseApiService implements BaseApiServiceInterface {
  protected readonly client: AxiosInstance = HttpClient

  get<T = any>(url: string): Promise<AxiosResponse<T, any>> {
    return this.client.get(url)
  }

  post<T = any>(url: string, data?: any): Promise<AxiosResponse<T, any>> {
    return this.client.post(url, data)
  }
  put<T = any>(url: string, data?: any): Promise<AxiosResponse<T, any>> {
    throw new Error('Method not implemented.')
  }
  delete<T = any>(url: string): Promise<AxiosResponse<T, any>> {
    throw new Error('Method not implemented.')
  }
}
