import type { AxiosResponse } from 'axios'

export interface BaseApiServiceInterface {
  get<T = any>(url: string): Promise<AxiosResponse<T, any>>
  post<T = any>(url: string, data?: any): Promise<AxiosResponse<T, any>>
}
