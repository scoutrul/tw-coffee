<template>
  <div class="card-header">
    <UIcon :name="icon" class="text-2xl text-primary" />
    <h1 class="m-0">{{ title }}</h1>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: 'i-heroicons-beaker-20-solid'
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/mixins' as *;

.card-header {
  @include flex-center;
  gap: 0.5rem;
  justify-content: flex-start;
  
  :deep(h1) {
    flex-grow: 1;
  }
}
</style> 