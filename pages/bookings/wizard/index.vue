<script setup lang="ts">
import { ref } from 'vue'
import Header from '@/components/Header/Header.vue'
import Step1 from './Step1.vue'
import Step2 from './Step2.vue'
import Step3 from './Step3.vue'
import type { BookingUserType } from '../types'

const step = ref<number>(1)
const booking = ref<BookingUserType>({
  booking: {
    id: 0,
    idTravel: 0,
    paymentMethod: 0,
    note: '',
  },
  user: {
    name: '',
    email: '',
    phone: '',
    age: '',
  },
})

const updateBooking = (newBooking: BookingUserType) => {
  booking.value = newBooking
}

const updateStep = (newStep: number) => {
  step.value = newStep
}
</script>

<template>
  <div class="containero">
    <Header
      :title="'New Booking'"
      :back="'/bookings'"
      :theme="'themeBooking'"
    />
    <Step1
      v-if="step === 1"
      :data="booking"
      @update:data="updateBooking"
      @update:step="updateStep"
    />
    <Step2
      v-if="step === 2"
      :data="booking"
      @update:data="updateBooking"
      @update:step="updateStep"
    />
    <Step3 v-if="step === 3" :data="booking" />
  </div>
</template>

<style scoped>
.containero {
  @apply min-h-screen bg-themeBooking-background text-themeBooking-text flex flex-col;
}
</style>
