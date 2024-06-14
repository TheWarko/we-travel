<script setup lang="ts">
import Header from '@/components/Header/Header.vue'
import Datalist from './components/Datalist.vue'
import Button from '@/components/Buttons/Button.vue'
import ToastSuccess from '@/components/Toasts/ToastSuccess.vue'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { TravelType } from './types'

const router = useRouter()
const route = useRoute()

const successToast = ref()

const { data, error } = await useFetch<TravelType[]>('/api/travels')
const travels = ref<TravelType[]>(data.value || [])

const goToEditPage = (): void => {
  router.push('/travels/edit/0')
}

const updateData = (newData: TravelType[]): void => {
  travels.value = newData
}

onMounted(() => {
  if (route.query.success === 'true') {
    successToast.value.showToast()
  }
})
</script>

<template>
  <div>
    <div class="themeTravel-container">
      <Header :title="'Travels'" :back="'/'" />
      <ErrorMessage :error="error" />
      <ToastSuccess
        ref="successToast"
        message="New travel has been successfully created."
      />

      <div class="content" v-if="!error">
        <div class="actions">
          <Button @click="goToEditPage">NEW TRAVEL</Button>
        </div>
        <Datalist :data="travels" @update:data="updateData" />
        <div class="actions">
          <Button @click="goToEditPage">NEW TRAVEL</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content {
  @apply flex-1 p-8;
}

.actions {
  @apply m-4 flex justify-end;
}
</style>
