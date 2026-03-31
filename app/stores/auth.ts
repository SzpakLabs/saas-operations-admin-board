import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: {
      name: 'Alex Thompson',
      email: 'alex@opsboard.io',
      role: 'Operations Manager',
      avatar: ''
    }
  }),

  actions: {
    login() {
      this.isAuthenticated = true
      if (import.meta.client) localStorage.setItem('opsboard_auth', 'true')
    },
    logout() {
      this.isAuthenticated = false
      if (import.meta.client) localStorage.removeItem('opsboard_auth')
    }
  }
})
