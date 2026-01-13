
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from '#app' 
import { useAuthStore } from '../../stores/auth.store'

const authStore = useAuthStore()
const router = useRouter()

// form state
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

// watch authentication state
watch(
  () => authStore.isAuthenticated,
  (isAuth) => {
    if (isAuth) {
      router.push('/tasks')
    }
  },
  { immediate: true }
)

// submit handler
const handleLogin = async () => {
  errorMessage.value = ''
  loading.value = true

  const res = await authStore.login(email.value, password.value)

  loading.value = false

  if (!res.success) {
    errorMessage.value = res.message || 'Invalid credentials'
  }
}
</script>

<template>
  <div style="max-width: 400px; margin: 100px auto;">
    <h2>Login</h2>

    <form @submit.prevent="handleLogin">
      <div>
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          required
        />
      </div>

      <div style="margin-top: 10px;">
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
        />
      </div>

      <div v-if="errorMessage" style="color: red; margin-top: 10px;">
        {{ errorMessage }}
      </div>

      <div style="margin-top: 15px;">
        <button type="submit" :disabled="loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </div>
    </form>
  </div>
</template>
