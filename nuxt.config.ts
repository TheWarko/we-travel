export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",    
    "@pinia/nuxt",
    '@nuxt/eslint'
  ],
  css: [
    '@/assets/main.css' // Percorso al file CSS globale
  ],
  eslint: {
    fix: true
  }
})