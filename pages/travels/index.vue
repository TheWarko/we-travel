<script setup lang="ts">
import Header from '@/components/Header/Header.vue'
import Datalist from './components/Datalist.vue'
import Button from '@/components/Buttons/Button.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const { data } = await useFetch('/api/travels')
const travels = ref(data.value)

const goToEditPage = (): void => {
  router.push('/travels/edit/0')
}

const updateData = (newData: Array<any>): void => {
  travels.value = newData
}
</script>

<template>
  <div class="themeTravel-container">
    <Header :title="'Travels'" :back="'/'" />
    <div class="content">
      <div class="actions">
        <Button @click="goToEditPage">NEW TRAVEL</Button>
      </div>
      <Datalist :data="travels" @update:data="updateData" />
      <div class="actions">
        <Button @click="goToEditPage">NEW TRAVEL</Button>
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
