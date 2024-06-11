<script setup lang="ts">
import { ref, computed } from 'vue'
import Button from '@/components/Buttons/Button.vue'
import ButtonCancel from '@/components/Buttons/ButtonCancel.vue'
import Filters from './Filters.vue'
import ConfirmModal from '@/components/Modals/ConfirmModal.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:data'])

const filters = ref({
  departure: '',
  return: '',
  price: '',
  score: ''
})

const showModal = ref(false)
const itemToDelete = ref<number | null>(null)

const goToEditPage = (id: number) => {
  router.push(`/travels/edit/${id}`)
}

const confirmDelete = (id: number) => {
  itemToDelete.value = id
  showModal.value = true
}

const deleteItem = async () => {
  try {
    // await $fetch(`/api/travels/${itemToDelete.value}`, {
    //   method: 'DELETE'
    // })
    const updatedData = props.data.filter(item => item.id !== itemToDelete.value)
    emit('update:data', updatedData)
    showModal.value = false
  } catch (error) {
    console.error('Error deleting item:', error)
  }
}

const cancelDelete = () => {
  showModal.value = false
}

const filteredData = computed(() => {
  return props.data.filter(item => {
    const matchesDeparture = filters.value.departure ? item.departure >= filters.value.departure : true
    const matchesReturn = filters.value.return ? item.return >= filters.value.return : true
    const matchesPrice = filters.value.price ? (
      filters.value.price === '3000+' ? item.price >= 3000 :
      item.price >= parseInt(filters.value.price.split('-')[0]) && item.price <= parseInt(filters.value.price.split('-')[1])
    ) : true
    const matchesScore = filters.value.score ? item.score >= parseInt(filters.value.score) : true

    return matchesDeparture && matchesReturn && matchesPrice && matchesScore
  })
})

const updateFilters = (newFilters: typeof filters.value) => {
  filters.value = newFilters
}
</script>

<template>
  <Filters @update:filters="updateFilters" />

  <div class="datalist-container">
    <div v-if="filteredData.length === 0" class="no-results">
      No results, try with different filters.
    </div>
    <div v-else>
      <div class="header-row">
        <div class="header-cell col-span-2"></div>
        <div class="header-cell col-span-2">Travel</div>
        <div class="header-cell col-span-1">Departure</div>
        <div class="header-cell col-span-1">Return</div>
        <div class="header-cell col-span-3">Description</div>
        <div class="header-cell col-span-1">Price</div>
        <div class="header-cell col-span-1">Score</div>
        <div class="header-cell col-span-1"></div>
      </div>
      <div class="data-rows">
        <template v-for="item in filteredData" :key="item.id">
          <div class="data-cell col-span-2">
            <img :src="item.picture" :alt="item.name" class="image">
          </div>
          <div class="data-cell col-span-2 font-bold">{{ item.name }}</div>
          <div class="data-cell col-span-1">{{ item.departure }}</div>
          <div class="data-cell col-span-1">{{ item.return }}</div>
          <div class="data-cell col-span-3">{{ item.description }}</div>
          <div class="data-cell col-span-1">{{ item.price }}</div>
          <div class="data-cell col-span-1">{{ item.score }}</div>
          <div class="data-cell col-span-1 actions">
            <Button @click="goToEditPage(item.id)" class="mb-2">EDIT</Button>
            <ButtonCancel @click="confirmDelete(item.id)">DELETE</ButtonCancel>
          </div>
        </template>
      </div>
      <div class="mobile-rows">
        <div v-for="item in filteredData" :key="item.id" class="mobile-row">
          <div><img :src="item.picture" :alt="item.name" class="image mb-2"></div>
          <div class="font-bold" ><strong>Name:</strong> {{ item.name }}</div>
          <div><strong>Departure:</strong> {{ item.departure }}</div>
          <div><strong>Return:</strong> {{ item.return }}</div>
          <div><strong>Description:</strong> {{ item.description }}</div>
          <div><strong>Price:</strong> {{ item.price }}</div>
          <div><strong>Score:</strong> {{ item.score }}</div>
          <div class="flex justify-end mt-2">
            <Button @click="goToEditPage(item.id)" class="mr-2">EDIT</Button>
            <ButtonCancel @click="confirmDelete(item.id)">DELETE</ButtonCancel>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ConfirmModal 
    :visible="showModal" 
    title="Confirm Delete" 
    message="Are you sure you want to delete this travel?" 
    @confirm="deleteItem" 
    @cancel="cancelDelete" 
  />
</template>

<style scoped>
.datalist-container {
  @apply bg-white rounded-md shadow-md;
}

.header-row {
  @apply hidden px-4 md:grid grid-cols-12 w-full bg-themeTravel-primary text-themeTravel-background rounded-t-md; 
}

.header-cell {
  @apply p-4;
}

.data-rows {
  @apply hidden p-4 md:grid grid-cols-12 w-full;
}

.data-cell {
  @apply px-4 py-8 text-themeTravel-text;
}

.image {
  @apply rounded-md shadow-md w-full h-auto object-cover;
}

.actions {
  @apply flex flex-col items-end;
}

.mobile-rows {
  @apply md:hidden;
}

.mobile-row {
  @apply p-8 border-b border-themeTravel-primary text-themeTravel-text;
}

.no-results {
  @apply text-center text-themeTravel-text py-8;
}
</style>
