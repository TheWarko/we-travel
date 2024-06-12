export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",    
    "@pinia/nuxt",
  ],
  css: [
    '@/assets/main.css' // Percorso al file CSS globale
  ],
})