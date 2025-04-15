<template>
  <div class="action-buttons">
    <UButton
      v-if="showLogoutButton"
      color="error"
      class="logout-button"
      @click="handleLogout"
      icon="i-heroicons-arrow-right-on-rectangle"
    >
      Выход
    </UButton>
    
    <UButton
      color="primary"
      @click="$emit('table')"
      icon="i-heroicons-table-cells-20-solid"
      class="me-2"
    >
      Пользователи
    </UButton>
    
    <UButton
      color="primary"
      @click="$emit('products')"
      icon="i-heroicons-shopping-bag-20-solid"
      class="me-2"
    >
      Каталог
    </UButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const toast = useCustomToast()
const emit = defineEmits(['logout', 'table', 'products'])

defineProps({
  showLogoutButton: {
    type: Boolean,
    default: true
  }
})

// Обработчик для кнопки выхода из системы
function handleLogout() {
  toast.add({
    title: 'Выход из системы',
    description: 'Выполняется выход...',
    color: 'primary',
    icon: 'i-heroicons-power-20-solid'
  })
  
  // Небольшая задержка, чтобы показать уведомление перед выходом
  setTimeout(() => {
    emit('logout')
  }, 1000)
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/mixins' as *;

.action-buttons {
  display: flex;
  margin-top: $spacing-unit * 1.5;
}

.logout-button {
  background-color: $primary-color;
  color: white;
}
</style> 