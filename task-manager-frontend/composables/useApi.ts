import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import { useAuthStore } from '../stores/auth.store'

export default function useApi(): AxiosInstance {
  const authStore = useAuthStore()

  const api = axios.create({
    baseURL: import.meta.env.NUXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      if (authStore.token) {
        config.headers = config.headers || {}
        config.headers['Authorization'] = `Bearer ${authStore.token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // Response interceptor for global error handling
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        console.error('API error:', error.response.data)
      } else {
        console.error('Network error:', error.message)
      }
      return Promise.reject(error)
    }
  )

  return api
}
