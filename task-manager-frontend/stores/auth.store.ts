import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import useApi from '../composables/useApi'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(
    import.meta.client ? localStorage.getItem('token') : null
  )

  const isAuthenticated = computed(() => !!token.value)

  const api = useApi()

  async function login(email: string, password: string) {
    try {
      const res = await api.post('/login', { email, password })
      const authToken = res.data.token

      token.value = authToken
      localStorage.setItem('token', authToken)

      return { success: true }
    } catch (err: any) {
      return {
        success: false,
        message: err.response?.data?.message || 'Login failed',
      }
    }
  }

  function logout() {
    token.value = null
    localStorage.removeItem('token')
  }

  return {
    token,
    isAuthenticated,
    login,
    logout,
  }
})
