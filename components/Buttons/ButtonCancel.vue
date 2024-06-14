<template>
  <button class="btn-cancel">
    <slot></slot>
  </button>
</template>

<style scoped>
.btn-cancel {
  @apply bg-gray-200 hover:bg-gray-300 text-gray-500 font-bold py-2 px-4 rounded-lg;
}
</style>
