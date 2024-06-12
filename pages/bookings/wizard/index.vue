<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Header from '@/components/Header/Header.vue'
import Wizard from '@/components/Wizard/Wizard.vue'
import FormGroup from '@/components/FormGroup/FormGroup.vue'
import Button from '@/components/Buttons/Button.vue'

const router = useRouter()
const searchQuery = ref('')
const selectedTravel = ref(null)
const travels = ref([])

const { data } = await useFetch('/api/travels')
travels.value = data.value

const filteredTravels = computed(() =>
  travels.value.filter(travel => travel.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
)

const selectTravel = (travel) => {
  selectedTravel.value = travel
  router.push('/bookings/wizard/step2')
}

</script>

<template>
  <div class="containero">
    <Header :title="'New Booking'" :back="'/bookings'" :theme="'themeBooking'" />
    <Wizard :steps="3" :currentStep="1" :theme="'themeBooking'" />
    <div class="content">
      <h2 class="text-2xl font-bold mb-4">Step 1: Choose the travel you want to book</h2>
      <form>
        <FormGroup :for="'travel'" :label="'Select Travel'">
          <input type="text" id="travel" class="input" v-model="searchQuery" />
        </FormGroup>
        <ul class="results">
          <li v-for="travel in filteredTravels" :key="travel.id" @click="selectTravel(travel)">
            {{ travel.name }}
          </li>
        </ul>
        <div v-if="filteredTravels.length === 0" class="p-2">No travels found, try with different words.</div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.containero {
  @apply min-h-screen bg-themeBooking-background text-themeBooking-text flex flex-col;
}

.content {
  @apply flex-1 p-8;
}

.results {
  @apply list-none p-0 mt-4 bg-white rounded-md shadow-md;
}

.results li {
  @apply cursor-pointer p-2 mb-2 hover:bg-themeBooking-primary hover:text-themeBooking-background;
}

.input {
  @apply w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-themeBooking-accent;
}
</style>
