<script setup lang="ts">
import Wizard from '@/components/Wizard/Wizard.vue'
import FormGroup from '@/components/FormGroup/FormGroup.vue'
import type { BookingUserType } from '../types'
import type { TravelType } from '../../travels/types'

const emit = defineEmits<{
  (e: 'update:data', updatedData: BookingUserType): void
  (e: 'update:step', step: number): void
}>()
const props = defineProps<{
  data: BookingUserType
}>()

const searchQuery = ref('')
const selectedTravel = ref<{ id: number, name: string }>()
const travels = ref<{ id: number, name: string }[]>([])

const { data } = await useFetch<TravelType>('/api/travels')
travels.value = data.value

const filteredTravels = computed(() =>
  travels.value.filter((travel) =>
    travel.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  ),
)

const selectTravel = (travel: { id: number, name: string }) => {
  selectedTravel.value = travel
  const updatedData = { 
    ...props.data, 
    booking: {
      ...props.data.booking, 
      idTravel: travel.id 
    }
  }
  console.log('updatedData', updatedData)
  emit('update:data', updatedData)
  emit('update:step', 2)
}
</script>

<template>
  <Wizard :steps="3" :currentStep="1" :theme="'themeBooking'" />
  <div class="we-content">
    <h2 class="title">Step 1: Choose the travel</h2>
    <form class="we-form">
      <FormGroup :for="'travel'" :label="'Select Travel'">
        <input type="text" id="travel" class="we-input" v-model="searchQuery" />
      </FormGroup>
      <ul class="results">
        <li
          v-for="travel in filteredTravels"
          :key="travel.id"
          @click="selectTravel(travel)"
        >
          {{ travel.name }}
        </li>
      </ul>
      <div v-if="filteredTravels.length === 0" class="p-2">
        No travels found, try with different words.
      </div>
    </form>
  </div>
</template>

<style scoped>
.title {
  @apply text-2xl font-bold mb-4 text-themeBooking-text;
}

.results {
  @apply list-none p-0 mt-4 bg-white rounded-md shadow-md;
}

.results li {
  @apply cursor-pointer p-2 mb-2 hover:bg-themeBooking-primary hover:text-themeBooking-background;
}
</style>
