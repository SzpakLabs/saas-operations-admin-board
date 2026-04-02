export default defineNuxtConfig({
  vite: {
    optimizeDeps: {
      include: ["vue-chartjs", "chart.js"],
    },
  },

  modules: ["@nuxt/ui", "@pinia/nuxt", "@nuxtjs/i18n"],

  i18n: {
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'es', name: 'Español', file: 'es.json' },
      { code: 'it', name: 'Italiano', file: 'it.json' },
      { code: 'fr', name: 'Français', file: 'fr.json' },
      { code: 'de', name: 'Deutsch', file: 'de.json' }
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    langDir: 'locales/'
  },

  css: ["~/assets/css/main.css"],

  devtools: { enabled: false },

  routeRules: {
    "/": { prerender: true },
  },

  compatibilityDate: "2025-01-15",
});
