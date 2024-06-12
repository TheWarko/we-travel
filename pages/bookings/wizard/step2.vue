
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Header from '@/components/Header/Header.vue'
import Wizard from '@/components/Wizard/Wizard.vue'
import FormGroup from '@/components/FormGroup/FormGroup.vue'
import Button from '@/components/Buttons/Button.vue'
import { validateForm } from '@/helpers/form'

const router = useRouter()

const user = ref({
  name: '',
  email: '',
  phone: '',
  age: 0,
  gender: ''
})

const errors = ref({
  name: '',
  email: '',
  phone: '',
  age: '',
  gender: ''
})

const submitForm = () => {
  if (validateForm(user, errors)) {
    router.push('/bookings/wizard/step3')
  }
}

const checkAge = () => {
  if (user.value.age > 150) {
      user.value.age = 0
  }
  }
</script>

<template>
    <div class="containero">
      <Header :title="'User Registration'" :back="'/bookings/wizard'" :theme="'themeBooking'" />
      <Wizard :steps="3" :currentStep="2" :theme="'themeBooking'" />
      <div class="content">
        <p class="title">Add User datas</p>
        <form @submit.prevent="submitForm" class="we-form">
          <FormGroup :for="'name'" :label="'Name'" :error="errors.name">
            <input v-model="user.name" type="text" id="name" class="we-input" />
          </FormGroup>
          <FormGroup :for="'email'" :label="'Email'" :error="errors.email">
            <input v-model="user.email" type="email" id="email" class="we-input" />
          </FormGroup>
          <FormGroup :for="'phone'" :label="'Phone'" :error="errors.phone">
            <input v-model="user.phone" type="tel" id="phone" class="we-input" />
          </FormGroup>
          <FormGroup :for="'age'" :label="'Age'" :error="errors.age">
            <input v-model.number="user.age" type="number" id="age" @change="checkAge" class="we-input" max="150" />
          </FormGroup>
          <FormGroup :for="'gender'" :label="'Gender'" :error="errors.gender">
            <select v-model="user.gender" id="gender" class="we-input">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </FormGroup>
          <div class="md:col-span-2 flex justify-end mt-4">
            <Button type="submit" :theme="'themeBooking'">Next</Button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <style scoped>
  .containero {
    @apply min-h-screen bg-themeBooking-background text-themeBooking-text flex flex-col;
  }
  
  .content {
    @apply flex flex-col items-center p-8;
    }

    .title {
    @apply text-3xl font-bold mb-8 text-themeBooking-text;
    }
  </style>
  