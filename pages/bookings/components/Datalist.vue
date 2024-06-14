<script setup lang="ts">
import { ref } from 'vue'
import ButtonCancel from '@/components/Buttons/ButtonCancel.vue'
import ConfirmModal from '@/components/Modals/ConfirmModal.vue'
import {
  PAYMENT_METHOD_TYPE_1,
  PAYMENT_METHOD_TYPE_2,
  PAYMENT_METHOD_TYPE_3,
} from '@/constants'
import type { BookingType } from '../types'

const { data: travelsData } = await useFetch('/api/travels')
const travels = ref(
  travelsData?.value?.map((travel: any) => ({
    id: travel.id,
    name: travel.name,
  })) || [],
)

const props = defineProps<{
  data: BookingType[]
}>()

const emit = defineEmits<{
  (e: 'update:data', updatedData: BookingType[]): void
}>()

const showModal = ref(false)
const itemToDelete = ref<number | null>(null)

const confirmDelete = (id: number) => {
  itemToDelete.value = id
  showModal.value = true
}

const deleteItem = async () => {
  try {
    // await $fetch(`/api/bookings/${itemToDelete.value}`, {
    //   method: 'DELETE'
    // })
    const updatedData = props.data.filter(
      (item) => item.id !== itemToDelete.value,
    )
    emit('update:data', updatedData)
    showModal.value = false
  } catch (error) {
    console.error('Error deleting item:', error)
  }
}

const cancelDelete = () => {
  showModal.value = false
}

const printPaymentType = (paymentMethod: number) => {
  switch (paymentMethod) {
    case 1:
      return PAYMENT_METHOD_TYPE_1
    case 2:
      return PAYMENT_METHOD_TYPE_2
    case 3:
      return PAYMENT_METHOD_TYPE_3
    default:
      return ''
  }
}

const printTravelName = (idTravel: number) => {
  const travel = travels.value.find((travel) => travel.id === idTravel)
  return travel ? travel.name : ''
}
</script>

<template>
  <div class="datalist-container">
    <div v-if="props.data.length === 0" class="no-results">
      No results, try with different filters.
    </div>
    <div v-else>
      <div class="header-row">
        <div class="header-cell col-span-2">Travel</div>
        <div class="header-cell col-span-2">Payment Method</div>
        <div class="header-cell col-span-6">Note</div>
        <div class="header-cell col-span-2"></div>
      </div>
      <div class="data-rows">
        <template v-for="item in props.data" :key="item.id">
          <div class="data-cell col-span-2">
            {{ printTravelName(item.idTravel) }}
          </div>
          <div class="data-cell col-span-2">
            {{ printPaymentType(item.paymentMethod) }}
          </div>
          <div class="data-cell col-span-6">{{ item.note }}</div>
          <div class="data-cell col-span-2 actions">
            <ButtonCancel @click="confirmDelete(item.id)">DELETE</ButtonCancel>
          </div>
        </template>
      </div>
      <div class="mobile-rows">
        <div v-for="item in props.data" :key="item.id" class="mobile-row">
          <div>
            <strong>Travel ID:</strong> {{ printTravelName(item.idTravel) }}
          </div>
          <div>
            <strong>Payment Method:</strong>
            {{ printPaymentType(item.paymentMethod) }}
          </div>
          <div><strong>Note:</strong> {{ item.note }}</div>
          <div class="flex justify-end mt-2">
            <ButtonCancel @click="confirmDelete(item.id)">DELETE</ButtonCancel>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ConfirmModal
    :visible="showModal"
    title="Confirm Delete"
    message="Are you sure you want to delete this booking?"
    @confirm="deleteItem"
    @cancel="cancelDelete"
  />
</template>

<style scoped>
.datalist-container {
  @apply bg-white rounded-md shadow-md;
}

.header-row {
  @apply hidden px-4 md:grid grid-cols-12 w-full bg-themeBooking-primary text-themeBooking-background rounded-t-md;
}

.header-cell {
  @apply p-4;
}

.data-rows {
  @apply hidden p-4 md:grid grid-cols-12 w-full;
}

.data-cell {
  @apply px-4 py-8 text-themeBooking-text;
}

.actions {
  @apply flex flex-col items-end;
}

.mobile-rows {
  @apply md:hidden;
}

.mobile-row {
  @apply p-8 border-b border-themeBooking-primary bg-themeBooking-background text-themeBooking-text;
}

.no-results {
  @apply text-center text-themeBooking-text py-8;
}
</style>
