<script setup>
const props = defineProps({
  theme: {
    type: String,
    required: false,
    default: 'themeTravel'
  }
})
</script>

<template>
    <button :class="`btn ${props.theme}`">
        <slot></slot>
    </button>
</template>

<style scoped>
.btn {
  @apply font-bold py-2 px-4 rounded-lg;
}

.themeTravel {
  @apply bg-themeTravel-primary hover:brightness-110 text-themeTravel-background;
}

.themeBooking {
  @apply bg-themeBooking-primary hover:brightness-110 text-themeBooking-background;
}

</style>
