<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  back: {
    type: String,
    required: false
  },
  theme: {
    type: String,
    required: false,
    default: 'themeTravel'
  }
})

const router = useRouter()

const goBack = (): void => {
  if (props.back) {
    router.push(props.back)
  } else {
    router.back()
  }
}
</script>

<template>
  <header :class="`header ${props.theme}`">
    <button v-if="props.back" @click="goBack" class="back-button">Back</button>
    <h1 class="title">{{ title }}</h1>
  </header>
</template>

<style scoped>
.header {
  @apply p-4 flex items-center;
}

.themeTravel {
  @apply bg-themeTravel-primary text-themeTravel-background;
}

.themeBooking {
  @apply bg-themeBooking-primary text-themeBooking-background;
}

.back-button {
  @apply px-4 py-2 rounded-lg mr-4;
}

.themeTravel .back-button {
  @apply bg-themeTravel-secondary text-themeTravel-background;
}

.themeBooking .back-button {
  @apply bg-themeBooking-secondary text-themeBooking-background;
}

.title {
  @apply text-2xl font-bold;
}
</style>
