<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FormGroup from '@/components/FormGroup/FormGroup.vue'
import Button from '@/components/Buttons/Button.vue'
import ButtonCancel from '@/components/Buttons/ButtonCancel.vue'
import Header from '@/components/Header/Header.vue'
import { validateForm } from '@/helpers/form'
import type { TravelTypeUpload } from '../types'

const route = useRoute()
const router = useRouter()
const isEditMode = ref(false)
const error = ref<any>(null) // Assicurati che sia di tipo `Error | null`
const travel = ref({
  id: null,
  name: '',
  departure: '',
  return: '',
  price: 0,
  score: 0,
  description: '',
  picture: null as File | null,
})
const errors = ref({
  name: '',
  departure: '',
  return: '',
  price: '',
  score: '',
  description: '',
  picture: '',
})

const fetchTravel = async (id: number) => {
  const { data, error: fetchError } =
    await useFetch<TravelTypeUpload>(`/api/travels`)
  if (Array.isArray(data.value) && data.value !== null) {
    const travelData = data.value.find((travel) => travel.id === id)
    if (travelData) {
      travel.value = travelData
    }
  }
  if (fetchError.value) {
    error.value = error
    return
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
      // This is a fake submit, in a real application you should call the API and then check the response status 
      //
      // const result = await $fetch('/api/travels/new', {
      //   method: 'POST',
      //   body: JSON.stringify(travel.value),
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // })
      console.log(travel.value)
      router.push('/travels?success=true')
    } catch (error) {
      console.error('Error adding travel:', error)
      //
      // In a real application you should handle the error, log it and show a message to the user
      //
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

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    travel.value.picture = target.files[0]
  }
}
</script>

<template>
  <div class="themeTravel-container">
    <Header :title="'Travels'" :back="'/travels'" />
    <ErrorMessage :error="error" />

    <div class="we-content" v-if="!error">
      <h1 class="title">{{ isEditMode ? 'Edit Travel' : 'Add New Travel' }}</h1>
      <form @submit.prevent="saveTravel" class="we-form">
        <FormGroup :for="'name'" :label="'Travel Name'" :error="errors.name">
          <input v-model="travel.name" type="text" id="name" class="we-input" />
        </FormGroup>
        <FormGroup
          :for="'departure'"
          :label="'Departure Date'"
          :error="errors.departure"
        >
          <input
            v-model="travel.departure"
            type="date"
            id="departure"
            class="we-input"
          />
        </FormGroup>
        <FormGroup
          :for="'return'"
          :label="'Return Date'"
          :error="errors.return"
        >
          <input
            v-model="travel.return"
            type="date"
            id="return"
            class="we-input"
          />
        </FormGroup>
        <FormGroup :for="'price'" :label="'Price'" :error="errors.price">
          <input
            v-model.number="travel.price"
            type="number"
            id="price"
            class="we-input"
            min="0"
            step="0.01"
          />
        </FormGroup>
        <FormGroup
          :for="'score'"
          :label="'Average Score'"
          :error="errors.score"
        >
          <input
            v-model.number="travel.score"
            @change="checkScore"
            type="number"
            step="0.1"
            id="score"
            class="we-input"
            max="5"
          />
        </FormGroup>
        <FormGroup
          :for="'description'"
          :label="'Description'"
          :error="errors.description"
        >
          <textarea
            v-model="travel.description"
            id="description"
            class="we-input"
          ></textarea>
        </FormGroup>
        <!-- <FormGroup :for="'picture'" :label="'Picture'" :error="errors.picture">
          <input v-model="travel.picture" type="text" id="picture" placeholder="http://" class="we-input">
        </FormGroup> -->
        <FormGroup :for="'picture'" :label="'Picture'" :error="errors.picture">
          <input
            @change="handleFileUpload"
            type="file"
            id="picture"
            class="we-input"
          />
        </FormGroup>
        <div class="actions">
          <ButtonCancel type="button" @click="cancel" class="mr-4"
            >Cancel</ButtonCancel
          >
          <Button type="submit">{{ isEditMode ? 'Update' : 'Save' }}</Button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.containero {
  @apply min-h-screen bg-themeTravel-background text-themeTravel-text;
}

.title {
  @apply text-3xl font-bold mb-8 text-themeTravel-text;
}

.actions {
  @apply flex justify-end;
}
</style>
