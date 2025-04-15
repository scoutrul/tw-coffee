<template>
  <div class="action-buttons">
    <UButton
      v-if="showLogoutButton"
      color="primary"
      variant="solid"
      icon="i-heroicons-power-20-solid"
      size="md"
      class="logout-button"
      @click="handleLogout"
    >
      Выйти из системы
    </UButton>
    
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const toast = useCustomToast()
const emit = defineEmits(['logout'])

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