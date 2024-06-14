<template>
    <div v-if="visible" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">{{ title }}</h2>
        <p class="mb-4">{{ message }}</p>
        <div class="flex justify-end">
          <ButtonCancel @click="cancel" class="mr-2">Annulla</ButtonCancel>
          <button @click="confirm" class="btn-confirm">Conferma</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
    import ButtonCancel from '@/components/Buttons/ButtonCancel.vue'

    const props = defineProps({
        visible: Boolean,
        title: String,
        message: String
    })
    
    const emit = defineEmits(['confirm', 'cancel'])
    
    const confirm = () => {
        emit('confirm')
    }
    
    const cancel = () => {
        emit('cancel')
    }
  </script>


<style scoped>
.btn-confirm {
  @apply bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-black;
}
</style>
