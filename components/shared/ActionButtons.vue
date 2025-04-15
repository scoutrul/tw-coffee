<template>
  <div class="action-buttons">
    <UButton
      v-if="showTableButton"
      color="primary"
      icon="i-heroicons-table-cells-20-solid"
      class="action-button"
      @click="$emit('table')"
    >
      Просмотр таблицы
    </UButton>
    
    <UButton
      v-if="showLogoutButton"
      color="error"
      icon="i-heroicons-power-20-solid"
      variant="soft"
      class="action-button"
      @click="$emit('logout')"
    >
      Выйти из системы
    </UButton>
    
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  showTableButton: {
    type: Boolean,
    default: true
  },
  showLogoutButton: {
    type: Boolean,
    default: true
  }
})

defineEmits(['table', 'logout'])
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/mixins' as *;

.action-buttons {
  @include flex-row-center;
  gap: 0.5rem;
  margin-top: $spacing-unit;
}

.action-button {
  @include flex-row-center;
}
</style> 