<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  steps: {
    type: Number,
    required: true,
  },
  currentStep: {
    type: Number,
    required: true,
  },
  theme: {
    type: String,
    required: false,
    default: 'themeTravel',
  },
})

const stepArray = computed(() =>
  Array.from({ length: props.steps }, (_, i) => i + 1),
)
</script>

<template>
  <div :class="[theme, 'wizard-container']">
    <div class="wizard-steps">
      <div
        v-for="step in stepArray"
        :key="step"
        :class="['wizard-step', { 'active-step': step === currentStep }]"
      >
        {{ step }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.wizard-container {
  @apply flex p-4;
}

.wizard-steps {
  @apply flex space-x-2 flex-grow;
}

.wizard-step {
  @apply px-4 py-2 rounded-lg text-center w-full;
}

.active-step {
  @apply font-bold;
}

.themeTravel .wizard-step {
  @apply bg-themeTravel-secondary text-themeTravel-background;
}

.themeTravel .active-step {
  @apply bg-themeTravel-primary text-themeTravel-background;
}

.themeBooking .wizard-step {
  @apply bg-themeBooking-secondary text-themeBooking-background;
}

.themeBooking .active-step {
  @apply bg-themeBooking-primary text-themeBooking-background;
}
</style>
