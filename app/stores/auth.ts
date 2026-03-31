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
    },
    logout() {
      this.isAuthenticated = false
    }
  }
})
