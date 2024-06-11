<template>
  <div class="containero">
    <h1 class="title">{{ isEditMode ? 'Edit Travel' : 'Add New Travel' }}</h1>
    <form @submit.prevent="saveTravel" class="form">
      <FormGroup :for="'name'" :label="'Travel Name'" :error="errors.name">
        <input v-model="travel.name" type="text" id="name" class="input">
      </FormGroup>
      <FormGroup :for="'departure'" :label="'Departure Date'" :error="errors.departure">
        <input v-model="travel.departure" type="date" id="departure" class="input">
      </FormGroup>
      <FormGroup :for="'return'" :label="'Return Date'" :error="errors.return">
        <input v-model="travel.return" type="date" id="return" class="input">
      </FormGroup>
      <FormGroup :for="'price'" :label="'Price'" :error="errors.price">
        <input v-model.number="travel.price" type="number" id="price" class="input" min="0" step="0.01">
      </FormGroup>
      <FormGroup :for="'score'" :label="'Average Score'" :error="errors.score">
        <input v-model.number="travel.score" @change="checkScore" type="number" step="0.1" id="score" class="input" max="5">
      </FormGroup>
      <FormGroup :for="'description'" :label="'Description'" :error="errors.description">
        <textarea v-model="travel.description" id="description" class="input"></textarea>
      </FormGroup>
      <FormGroup :for="'picture'" :label="'Picture'" :error="errors.picture">
        <input v-model="travel.picture" type="text" id="picture" placeholder="http://" class="input">
      </FormGroup>
      <div class="actions">
        <ButtonCancel type="button" @click="cancel" class="mr-4">Cancel</ButtonCancel>
        <Button type="submit">{{ isEditMode ? 'Update' : 'Save' }}</Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FormGroup from '@/components/FormGroup/FormGroup.vue'
import Button from '@/components/Buttons/Button.vue'
import ButtonCancel from '@/components/Buttons/ButtonCancel.vue'

const route = useRoute()
const router = useRouter()
const isEditMode = ref(false)
const travel = ref({
  id: null,
  name: '',
  departure: '',
  return: '',
  price: 0,
  score: 0,
  description: '',
  picture: ''
})
const errors = ref({
  name: '',
  departure: '',
  return: '',
  price: '',
  score: '',
  description: '',
  picture: ''
})

const fetchTravel = async (id: number) => {
  const { data } = await useFetch(`/api/travels`)
  if (Array.isArray(data.value) && data.value !== null) {
    const travelData = data.value.find(travel => travel.id === id)
    if (travelData) {
      travel.value = travelData
    }
  }
}

onMounted(() => {
  if (route.params.id) {
    isEditMode.value = route.params.id !== '0'
    fetchTravel(Number(route.params.id))
  }
})

const validateForm = () => {
  let valid = true
  Object.keys(travel.value).forEach(key => {
    if (!travel.value[key]) {
      errors.value[key] = `The field ${key} is required`
      valid = false
    } else {
      errors.value[key] = ''
    }
  })
  return valid
}

const saveTravel = async () => {
  if (validateForm()) {
    try {
      // const result = await $fetch('/api/travels', {
      //   method: 'POST',
      //   body: {
      //     ...travel.value
      //   }
      // })
      alert('Saved!')
      router.push('/travels')
    } catch (error) {
      console.error('Error adding travel:', error)
    }
  }
}

const cancel = () => {
  router.push('/travels')
}

const checkScore = () => {
  if (travel.value.score > 5) {
    travel.value.score = 5
  }
}
</script>

<style scoped>
.containero {
  @apply min-h-screen p-8 bg-themeTravel-background flex flex-col items-center;
}

.title {
  @apply text-3xl font-bold mb-8 text-themeTravel-text;
}

.form {
  @apply bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl;
}

.input {
  @apply w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-themeTravel-accent;
}

.actions {
  @apply flex justify-end;
}
</style>
