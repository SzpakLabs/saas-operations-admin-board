export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt'
  ],

  css: ['~/assets/css/main.css'],

  devtools: { enabled: false },

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15'
})
