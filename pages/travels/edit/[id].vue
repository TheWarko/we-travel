
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FormGroup from '@/components/FormGroup/FormGroup.vue'
import Button from '@/components/Buttons/Button.vue'
import ButtonCancel from '@/components/Buttons/ButtonCancel.vue'
import Header from '@/components/Header/Header.vue'
import { validateForm } from '@/helpers/form'

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

const saveTravel = async () => {
  if (validateForm(travel, errors)) {
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

<template>
  <div class="themeTravel-container">
    <Header :title="'Travels'" :back="'/travels'" />
    <div class="content">
      <h1 class="title">{{ isEditMode ? 'Edit Travel' : 'Add New Travel' }}</h1>
      <form @submit.prevent="saveTravel" class="we-form">
        <FormGroup :for="'name'" :label="'Travel Name'" :error="errors.name">
          <input v-model="travel.name" type="text" id="name" class="we-input">
        </FormGroup>
        <FormGroup :for="'departure'" :label="'Departure Date'" :error="errors.departure">
          <input v-model="travel.departure" type="date" id="departure" class="we-input">
        </FormGroup>
        <FormGroup :for="'return'" :label="'Return Date'" :error="errors.return">
          <input v-model="travel.return" type="date" id="return" class="we-input">
        </FormGroup>
        <FormGroup :for="'price'" :label="'Price'" :error="errors.price">
          <input v-model.number="travel.price" type="number" id="price" class="we-input" min="0" step="0.01">
        </FormGroup>
        <FormGroup :for="'score'" :label="'Average Score'" :error="errors.score">
          <input v-model.number="travel.score" @change="checkScore" type="number" step="0.1" id="score" class="we-input" max="5">
        </FormGroup>
        <FormGroup :for="'description'" :label="'Description'" :error="errors.description">
          <textarea v-model="travel.description" id="description" class="we-input"></textarea>
        </FormGroup>
        <FormGroup :for="'picture'" :label="'Picture'" :error="errors.picture">
          <input v-model="travel.picture" type="text" id="picture" placeholder="http://" class="we-input">
        </FormGroup>
        <div class="actions">
          <ButtonCancel type="button" @click="cancel" class="mr-4">Cancel</ButtonCancel>
          <Button type="submit">{{ isEditMode ? 'Update' : 'Save' }}</Button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.containero {
  @apply min-h-screen bg-themeTravel-background text-themeTravel-text flex flex-col;
}

.content {
  @apply flex flex-col items-center p-8;
}

.title {
  @apply text-3xl font-bold mb-8 text-themeTravel-text;
}

.actions {
  @apply flex justify-end;
}
</style>
