<template>
  <div class="containero">
    <h1 class="title">Welcome to Travels and Bookings management system</h1>
    <div class="links">
      <nuxt-link to="/travels" class="box"> Travels Manager </nuxt-link>
      <nuxt-link to="/bookings" class="box"> Bookings Manager </nuxt-link>
    </div>
  </div>
</template>

<style scoped>
.containero {
  @apply min-h-screen flex flex-col items-center justify-center bg-themeTravel-background;
}

.title {
  @apply text-4xl font-bold mb-8 text-themeTravel-text text-center;
}

.links {
  @apply flex flex-wrap justify-center gap-4;
}

.box {
  @apply w-64 h-32 flex items-center justify-center bg-themeTravel-primary text-themeTravel-background shadow-lg rounded-lg text-xl font-semibold text-center hover:bg-themeTravel-secondary;
}
</style>
