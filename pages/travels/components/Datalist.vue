<script setup lang="ts">
import { ref, computed } from 'vue'
import Button from '@/components/Buttons/Button.vue'
import ButtonCancel from '@/components/Buttons/ButtonCancel.vue'
import Filters from './Filters.vue'
import ConfirmModal from '@/components/Modals/ConfirmModal.vue'
import { useRouter } from 'vue-router'
import type { TravelType } from '../types'
import { formatDate } from '@/helpers/date'
import { printStars } from '@/helpers/utils'

const router = useRouter()

const props = defineProps<{
  data: TravelType[]
}>()

const emit = defineEmits<{
  (e: 'update:data', updatedData: TravelType[]): void
}>()

const filters = ref({
  departure: '',
  return: '',
  price: '',
  score: '',
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
    // This is a fake delete, in a real application you should call the API and then check the response status 
    //
    // await $fetch(`/api/travels/${itemToDelete.value}`, {
    //   method: 'DELETE'
    // })
    const updatedData = props.data.filter(
      (item) => item.id !== itemToDelete.value,
    )
    emit('update:data', updatedData)
    showModal.value = false
  } catch (error) {
    console.error('Error deleting item:', error)
    //
    // In a real application you should handle the error, log it and show a message to the user
    //
  }
}

const cancelDelete = () => {
  showModal.value = false
}

const filteredData = computed(() => {
  return props.data.filter((item) => {
    const matchesDeparture = filters.value.departure
      ? item.departure === filters.value.departure
      : true
    const matchesReturn = filters.value.return
      ? item.return === filters.value.return
      : true
    const matchesPrice = filters.value.price
      ? filters.value.price === '3000+'
        ? item.price >= 3000
        : item.price >= parseInt(filters.value.price.split('-')[0]) &&
          item.price <= parseInt(filters.value.price.split('-')[1])
      : true
    const matchesScore = filters.value.score
      ? item.score >= parseInt(filters.value.score)
      : true

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
        <div class="header-cell col-span-2">Dates</div>
        <div class="header-cell col-span-3">Description</div>
        <div class="header-cell col-span-1">Price</div>
        <div class="header-cell col-span-1">Score</div>
        <div class="header-cell col-span-1"></div>
      </div>
      <div class="data-rows">
        <template v-for="item in filteredData" :key="item.id">
          <div class="data-cell col-span-2">
            <picture>
              <source
                :srcset="`${item.picture}?w=480`"
                media="(max-width: 480px)"
              />
              <source
                :srcset="`${item.picture}?w=800`"
                media="(max-width: 800px)"
              />
              <source
                :srcset="`${item.picture}?w=1200`"
                media="(max-width: 1200px)"
              />
              <img :src="item.picture" :alt="item.name" class="image" />
            </picture>
          </div>
          <div class="data-cell col-span-2 font-bold">{{ item.name }}</div>
          <div class="data-cell col-span-2">
            <div>
              <span class="font-bold">from</span>
              {{ formatDate(item.departure) }}
            </div>
            <div>
              <span class="font-bold">to</span> {{ formatDate(item.return) }}
            </div>
          </div>
          <div class="data-cell col-span-3">{{ item.description }}</div>
          <div class="data-cell col-span-1">
            <span class="font-bold">{{ item.price.toLocaleString() }}</span> €
          </div>
          <div class="data-cell col-span-1 item-stars">
            {{ printStars(item.score) }}
          </div>
          <div class="data-cell col-span-1 actions">
            <Button @click="goToEditPage(item.id)" class="mb-2">EDIT</Button>
            <ButtonCancel @click="confirmDelete(item.id)">DELETE</ButtonCancel>
          </div>
        </template>
      </div>
      <div class="mobile-rows">
        <div v-for="item in filteredData" :key="item.id" class="mobile-row">
          <div>
            <picture>
              <source
                :srcset="`${item.picture}?w=480`"
                media="(max-width: 480px)"
              />
              <source
                :srcset="`${item.picture}?w=800`"
                media="(max-width: 800px)"
              />
              <source
                :srcset="`${item.picture}?w=1200`"
                media="(max-width: 1200px)"
              />
              <img :src="item.picture" :alt="item.name" class="image mb-2" />
            </picture>
          </div>
          <div>
            <strong>{{ item.name }}</strong>
          </div>
          <div>{{ item.description }}</div>
          <div>
            <p><strong>Dates</strong></p>
            <span> from</span> {{ formatDate(item.departure) }}
            <span> to</span> {{ formatDate(item.return) }}
          </div>
          <div><strong>Price:</strong> {{ item.price }} €</div>
          <div class="item-stars">{{ printStars(item.score) }}</div>
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

.mobile-row > div {
  @apply mb-4;
}

.no-results {
  @apply text-center text-themeTravel-text py-8;
}

.item-stars {
  @apply text-yellow-500;
}
</style>
