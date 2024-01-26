import type { AxiosInstance } from 'axios'
import axios from 'axios'

const baseURL = `${import.meta.env.VITE_PIXABAY_URL}`

const config = {
  baseURL,
}

const HttpClient: AxiosInstance = axios.create(config)

export default HttpClient
