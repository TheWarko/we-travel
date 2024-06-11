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
  <header class="header">
    <button v-if="props.back" @click="goBack" class="back-button">Back</button>
    <h1 class="title">{{ title }}</h1>
  </header>
</template>

<style scoped>
.header {
  @apply bg-themeTravel-primary text-themeTravel-background p-4 flex items-center;
}

.back-button {
  @apply bg-themeTravel-secondary text-themeTravel-background px-4 py-2 rounded-lg mr-4;
}

.title {
  @apply text-2xl font-bold;
}
</style>
