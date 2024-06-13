
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import Header from '@/components/Header/Header.vue'
  import Wizard from '@/components/Wizard/Wizard.vue'
  import FormGroup from '@/components/FormGroup/FormGroup.vue'
  import Button from '@/components/Buttons/Button.vue'
  import { validateForm } from '@/helpers/form'
  
  const router = useRouter()
  
  const booking = ref({
    paymentMethod: '',
    note: ''
  })
  
  const errors = ref({
    paymentMethod: ''
  })
  
  const submitForm = () => {
    if (validateForm(booking, errors)) {
      // Save booking data and finalize the booking
    //   alert('Booking submitted successfully!')
      router.push('/bookings/')
    }
  }
  </script>

<template>
    <div class="containero">
      <Header :title="'Payment Information'" :back="'/bookings/wizard/step2'" :theme="'themeBooking'" />
      <Wizard :steps="3" :currentStep="3" :theme="'themeBooking'" />
      <div class="content">
        <p class="title">Select Payment method</p>
        <form @submit.prevent="submitForm" class="we-form">
          <FormGroup :for="'paymentMethod'" :label="'Payment Method'" :error="errors.paymentMethod">
            <select v-model="booking.paymentMethod" id="paymentMethod" class="we-input">
              <option value="">Select Payment Method</option>
              <option value="creditTransfer">Credit transfer</option>
              <option value="paypal">Paypal</option>
              <option value="revolut">Revolut</option>
            </select>
          </FormGroup>
          <FormGroup :for="'note'" :label="'Note (Optional)'">
            <textarea v-model="booking.note" id="note" class="we-input"></textarea>
          </FormGroup>
          <div class="md:col-span-2 flex justify-end mt-4">
            <Button type="submit" :theme="'themeBooking'">Submit Booking</Button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <style scoped>
  .containero {
    @apply min-h-screen bg-themeBooking-background text-themeBooking-text;
  }
  
  .content {
    @apply flex flex-col items-center p-8;
    }

    .title {
    @apply text-3xl font-bold mb-8 text-themeBooking-text;
    }
    
    textarea.we-input {
        @apply resize-none h-32;
    } 
  </style>
  