import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return
  const auth = useAuthStore()

  // Restore auth state from localStorage if not already authenticated
  if (!auth.isAuthenticated && localStorage.getItem('opsboard_auth') === 'true') {
    auth.isAuthenticated = true
  }

  if (!auth.isAuthenticated && to.path !== '/login') {
    return navigateTo('/login')
  }
  if (auth.isAuthenticated && to.path === '/login') {
    return navigateTo('/')
  }
})
