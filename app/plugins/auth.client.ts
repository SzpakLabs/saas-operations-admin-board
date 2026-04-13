import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:beforeMount', () => {
    const auth = useAuthStore()
    if (localStorage.getItem('opsboard_auth') === 'true') {
      auth.isAuthenticated = true
    }
  })
})
