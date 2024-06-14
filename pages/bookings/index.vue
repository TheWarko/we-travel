<script setup lang="ts">
import Header from '@/components/Header/Header.vue'
import Datalist from './components/Datalist.vue'
import Button from '@/components/Buttons/Button.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const { data } = await useFetch('/api/bookings')
const bookings = ref(data.value)

const goToWizard = (): void => {
  router.push('/bookings/wizard')
}

const updateData = (newData: Array<any>): void => {
  bookings.value = newData
}
</script>

<template>
  <div class="themeBooking-container">
    <Header :title="'Bookings'" :back="'/'" :theme="'themeBooking'" />
    <div class="content">
      <div class="actions">
        <Button @click="goToWizard" :theme="'themeBooking'">NEW BOOKING</Button>
      </div>
      <Datalist :data="bookings" @update:data="updateData" />
      <div class="actions">
        <Button @click="goToWizard" :theme="'themeBooking'">NEW BOOKING</Button>
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
