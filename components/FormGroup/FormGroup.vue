<script setup lang="ts">
defineProps({
    for: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    error: {
      type: String,
      default: '',
    },
  })
</script>

<template>
  <div class="form-group">
    <label :for="for" class="label">{{ label }}</label>
    <slot></slot>
    <span v-if="error" class="text-red-500">{{ error }}</span>
  </div>
</template>

<style scoped>
.form-group {
  @apply mb-4;
}

.label {
  @apply block text-gray-700 font-bold mb-2;
}
</style>
