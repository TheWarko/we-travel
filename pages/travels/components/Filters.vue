<template>
  <div class="filters">
    <div class="grid md:grid-cols-4 gap-4">
      <FormGroup :for="'departure'" :label="'Departure Date'">
        <input
          type="date"
          id="departure"
          class="input"
          v-model="filters.departure"
          @input="updateFilters"
        />
      </FormGroup>
      <FormGroup :for="'return'" :label="'Return Date'">
        <input
          type="date"
          id="return"
          class="input"
          v-model="filters.return"
          @input="updateFilters"
        />
      </FormGroup>
      <FormGroup :for="'price'" :label="'Price'">
        <select
          id="price"
          class="input"
          v-model="filters.price"
          @change="updateFilters"
        >
          <option value="">Select Price Range</option>
          <option value="0-1000">0 - 1.000</option>
          <option value="1000-2000">1.000 - 2.000</option>
          <option value="2000-3000">2.000 - 3.000</option>
          <option value="3000+">3.000+</option>
        </select>
      </FormGroup>
      <FormGroup :for="'score'" :label="'Minimum Score'">
        <select
          id="score"
          class="input"
          v-model="filters.score"
          @change="updateFilters"
        >
          <option value="">Select Minimum Score</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </FormGroup>
    </div>
    <div class="flex justify-end">
      <ButtonCancel type="button" @click="resetFilters">RESET</ButtonCancel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FormGroup from '@/components/FormGroup/FormGroup.vue'
import ButtonCancel from '@/components/Buttons/ButtonCancel.vue'

const filters = ref({
  departure: '',
  return: '',
  price: '',
  score: '',
})

const emit = defineEmits(['update:filters'])

const updateFilters = () => {
  emit('update:filters', { ...filters.value })
}

const resetFilters = () => {
  filters.value = {
    departure: '',
    return: '',
    price: '',
    score: '',
  }
  updateFilters()
}
</script>

<style scoped>
.filters {
  @apply mb-4 p-4 bg-white rounded-md shadow-md;
}

.input {
  @apply w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600;
}
</style>
