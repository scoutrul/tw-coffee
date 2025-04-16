<template>
  <div class="action-buttons">
    <UButton 
      color="primary"
      variant="soft"
      icon="i-heroicons-folder-open-20-solid"
      class="action-button"
      @click="$emit('products')"
    >
      Каталог продуктов
    </UButton>
    
    <UButton 
      color="error"
      variant="soft"
      icon="i-heroicons-power-20-solid"
      class="action-button"
      @click="$emit('logout')"
    >
      Выйти
    </UButton>
  </div>
</template>

<script setup lang="ts">
// Определяем события, которые могут быть вызваны из компонента
defineEmits(['products', 'logout'])
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/mixins' as *;

.action-buttons {
  @include flex-row-center;
  flex-wrap: wrap;
  gap: $spacing-unit;
}

.action-button {
  @include flex-row-center;
}
</style> 