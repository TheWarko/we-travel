<script setup lang="ts">
  import Header from '@/components/Header/Header.vue'
  import Step1 from './Step1.vue'
  import Step2 from './Step2.vue'
  import Step3 from './Step3.vue'

  const step = ref(1)
  const booking = ref({
    idTravel: 0,
    user: {
      name: '',
      email: '',
      phone: '',
      age: ''},
    paymentMethod: '',
    note: ''
  })

  const updateBooking = (newBooking) => {
    booking.value = newBooking
  }
  const updateStep = (newStep) => {
    step.value = newStep
  }
</script>

<template>
  <div class="containero">
    <Header :title="'New Booking'" :back="'/bookings'" :theme="'themeBooking'" />
    <Step1 v-if="step === 1" :data="booking" @update:data="updateBooking" @update:step="updateStep"/>
    <Step2 v-if="step === 2" :data="booking" @update:data="updateBooking" @update:step="updateStep"/>
    <Step3 v-if="step === 3" :data="booking" />
  </div>
</template>

<style scoped>
  .containero {
    @apply min-h-screen bg-themeBooking-background text-themeBooking-text flex flex-col;
  }
</style>
