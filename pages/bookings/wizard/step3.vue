<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Wizard from '@/components/Wizard/Wizard.vue'
import FormGroup from '@/components/FormGroup/FormGroup.vue'
import Button from '@/components/Buttons/Button.vue'
import { validateForm } from '@/helpers/form'
import {
  PAYMENT_METHOD_TYPE_1,
  PAYMENT_METHOD_TYPE_2,
  PAYMENT_METHOD_TYPE_3,
} from '@/constants'
import type { BookingUserType } from '../types'

const router = useRouter()

const props = defineProps<{
  data: BookingUserType
}>()

const paymentInfo = ref({
  paymentMethod: '',
  note: '',
})

const errors = ref({
  paymentMethod: '',
})

const submitForm = async () => {
  if (validateForm(paymentInfo, errors)) {
    const updatedData = {
      ...props.data,
      booking: {
        ...props.data.booking,
        paymentMethod: paymentInfo.value.paymentMethod,
        note: paymentInfo.value.note,
      },
      user: {
        ...props.data.user,
      }
    }

    try {
      // const result = await $fetch('/api/bookings/new', {
      //   method: 'POST',
      // body: JSON.stringify(updatedData),
      // headers: {
      //   'Content-Type': 'application/json'
      // }
      // })
      console.log(updatedData)
      router.push('/bookings')
    } catch (error) {
      console.error('Error adding travel:', error)
    }
  }
}
</script>

<template>
  <Wizard :steps="3" :currentStep="3" :theme="'themeBooking'" />
  <div class="we-content">
    <p class="title">Step 3: Select payment method</p>
    <form @submit.prevent="submitForm" class="we-form">
      <FormGroup
        :for="'paymentMethod'"
        :label="'Payment Method'"
        :error="errors.paymentMethod"
      >
        <select
          v-model="paymentInfo.paymentMethod"
          id="paymentMethod"
          class="we-input"
        >
          <option value="">Select Payment Method</option>
          <option value="1">{{ PAYMENT_METHOD_TYPE_1 }}</option>
          <option value="2">{{ PAYMENT_METHOD_TYPE_2 }}</option>
          <option value="3">{{ PAYMENT_METHOD_TYPE_3 }}</option>
        </select>
      </FormGroup>
      <FormGroup :for="'note'" :label="'Note (Optional)'">
        <textarea
          v-model="paymentInfo.note"
          id="note"
          class="we-input"
        ></textarea>
      </FormGroup>
      <div class="md:col-span-2 flex justify-end mt-4">
        <Button type="submit" :theme="'themeBooking'">Submit Booking</Button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.title {
  @apply text-2xl font-bold mb-4 text-themeBooking-text;
}

textarea.we-input {
  @apply resize-none h-32;
}
</style>
