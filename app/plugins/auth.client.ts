import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin(() => {
  const auth = useAuthStore()
  if (localStorage.getItem('opsboard_auth') === 'true') {
    auth.isAuthenticated = true
  }
})
