import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { TOKEN_KEY } from '../constants'

const config = {
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
}

const HttpClient: AxiosInstance = axios.create(config)

function requestInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  const token = localStorage.getItem(TOKEN_KEY)
  config.headers.Accept = 'application/json'

  if (!config.headers.Authorization && token) {
    config.headers.Authorization = `Basic ${token}`
  }

  return config
}

HttpClient.interceptors.request.use(requestInterceptor)

export default HttpClient
