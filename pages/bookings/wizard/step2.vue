<script setup lang="ts">
import Wizard from '@/components/Wizard/Wizard.vue'
import FormGroup from '@/components/FormGroup/FormGroup.vue'
import Button from '@/components/Buttons/Button.vue'
import {
  validateForm,
  isValidEmail,
  isValidPhone,
  isValidAge,
} from '@/helpers/form'

const emit = defineEmits(['update:data', 'update:step'])
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const user = ref({
  name: '',
  email: '',
  phone: '',
  age: '',
  gender: '',
})

const errors = ref({
  name: '',
  email: '',
  phone: '',
  age: '',
  gender: '',
})

const onChangeEmail = () => {
  if (!isValidEmail(user.value.email)) {
    errors.value.email = `The field email should be valid`
    return false
  } else {
    errors.value.email = ''
    return true
  }
}

const onChangePhone = () => {
  if (!isValidPhone(user.value.phone)) {
    errors.value.phone = `The field phone should be valid`
    return false
  } else {
    errors.value.phone = ''
    return true
  }
}

const onChangeAge = () => {
  if (!isValidAge(user.value.age)) {
    user.value.age = ''
    errors.value.age = 'The field age should be valid'
    return false
  } else {
    errors.value.age = ''
    return true
  }
}

const validateThisForm = (datas, errors) => {
  let valid = validateForm(datas, errors)

  if (!onChangeEmail()) {
    valid = false
  }

  if (!onChangePhone()) {
    valid = false
  }

  if (Number(datas.value.age) <= 0) {
    errors.value.age = `The field age should be valid`
    valid = false
  }

  return valid
}

const submitForm = () => {
  if (validateThisForm(user, errors)) {
    const updatedData = { ...props.data, user: user.value }
    emit('update:data', updatedData)
    emit('update:step', 3)
  }
}
</script>

<template>
  <Wizard :steps="3" :currentStep="2" :theme="'themeBooking'" />
  <div class="we-content">
    <p class="title">Step 2: Add User datas</p>
    <form @submit.prevent="submitForm" class="we-form">
      <FormGroup :for="'name'" :label="'Name'" :error="errors.name">
        <input v-model="user.name" type="text" id="name" class="we-input" />
      </FormGroup>
      <FormGroup :for="'email'" :label="'Email'" :error="errors.email">
        <input
          v-model="user.email"
          type="text"
          id="email"
          @change="onChangeEmail"
          class="we-input"
        />
      </FormGroup>
      <FormGroup :for="'phone'" :label="'Phone'" :error="errors.phone">
        <input
          v-model="user.phone"
          type="tel"
          id="phone"
          @change="onChangePhone"
          class="we-input"
        />
      </FormGroup>
      <FormGroup :for="'age'" :label="'Age'" :error="errors.age">
        <input
          v-model.number="user.age"
          type="text"
          id="age"
          @change="onChangeAge"
          class="we-input"
        />
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
</template>

<style scoped>
.title {
  @apply text-2xl font-bold mb-4 text-themeBooking-text;
}
</style>
