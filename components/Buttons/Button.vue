<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<style scoped>
.btn {
  @apply bg-green-900 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-lg;
}
</style>
