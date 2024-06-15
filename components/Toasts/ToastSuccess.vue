<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  message: string
}>()

const visible = ref(false)

const showToast = () => {
  visible.value = true
  setTimeout(() => {
    hideToast()
  }, 8000)
}

const hideToast = () => {
  visible.value = false
}

defineExpose({
  showToast,
  hideToast,
})
</script>

<template>
  <div v-if="visible" class="toast">
    <span>{{ message }}</span>
    <button @click="hideToast" class="close-button">&times;</button>
  </div>
</template>

<style scoped>
.toast {
  @apply fixed bg-green-500 text-white p-8 rounded shadow-lg flex items-center text-lg ml-4 mr-4 top-4;
}
.close-button {
  @apply ml-4 text-white font-bold text-lg;
}
</style>
