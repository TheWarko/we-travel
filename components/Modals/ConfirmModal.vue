<script setup lang="ts">
import ButtonCancel from '@/components/Buttons/ButtonCancel.vue'

defineProps({
  visible: Boolean,
  title: String,
  message: String,
})

const emit = defineEmits(['confirm', 'cancel'])

const confirm = () => {
  emit('confirm')
}

const cancel = () => {
  emit('cancel')
}
</script>

<template>
  <div v-if="visible" class="containero">
    <div class="content">
      <h2 class="text-xl font-bold mb-4">{{ title }}</h2>
      <p class="mb-4">{{ message }}</p>
      <div class="flex justify-end">
        <ButtonCancel @click="cancel" class="mr-2">Annulla</ButtonCancel>
        <button @click="confirm" class="btn-confirm">Conferma</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.containero {
  @apply fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50;
}

.content {
  @apply bg-white p-6 rounded-lg w-full max-w-md ml-4 mr-4;
}

.btn-confirm {
  @apply bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-black;
}
</style>
