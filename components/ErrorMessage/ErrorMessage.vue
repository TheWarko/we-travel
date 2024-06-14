<script setup lang="ts">
defineProps<{
  error: Error | null
}>()
</script>

<template>
  <div class="error-message" v-if="error">
    Error: An unexpected error occurred. Please try again later.
  </div>
</template>

<style scoped>
.error-message {
  @apply bg-red-500 text-white border p-8 rounded-md m-8;
}
</style>
