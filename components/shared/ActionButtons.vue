<template>
  <div class="action-buttons">
    <UButtonGroup v-if="showTableButton && showDownloadButton" class="mb-2">
      <UButton
        color="primary"
        icon="i-heroicons-table-cells-20-solid"
        size="md"
        class="action-button"
        @click="$emit('table')"
      >
        Просмотр таблицы
      </UButton>
      
      <UButton
        color="primary"
        variant="soft"
        icon="i-heroicons-arrow-down-tray-20-solid"
        size="md"
        class="action-button"
        @click="handleDownload"
      >
        Экспорт
      </UButton>
    </UButtonGroup>

    <UButton
      v-else-if="showTableButton"
      color="primary"
      icon="i-heroicons-table-cells-20-solid"
      size="md"
      class="action-button"
      @click="$emit('table')"
    >
      Просмотр таблицы
    </UButton>

    <UButton
      v-if="showUsersPageButton"
      to="/users"
      color="primary"
      icon="i-heroicons-users-20-solid"
      variant="soft"
      size="md"
      class="action-button"
    >
      Управление пользователями
    </UButton>

    <UButton
      v-if="showSettingsButton"
      color="neutral"
      icon="i-heroicons-cog-6-tooth-20-solid"
      variant="outline"
      size="md"
      class="action-button settings-button"
      @click="$emit('settings')"
    >
      Настройки профиля
    </UButton>
    
    <UButton
      v-if="showLogoutButton"
      color="error"
      icon="i-heroicons-power-20-solid"
      variant="soft"
      size="md"
      class="action-button logout-button"
      @click="handleLogout"
    >
      Выйти из системы
    </UButton>
    
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const toast = useToast()
const emit = defineEmits(['table', 'settings', 'logout'])

defineProps({
  showTableButton: {
    type: Boolean,
    default: true
  },
  showDownloadButton: {
    type: Boolean,
    default: true
  },
  showUsersPageButton: {
    type: Boolean,
    default: true
  },
  showSettingsButton: {
    type: Boolean,
    default: true
  },
  showLogoutButton: {
    type: Boolean,
    default: true
  }
})

// Обработчик для кнопки экспорта
function handleDownload() {
  toast.add({
    title: 'Экспорт данных',
    description: 'Файл успешно загружен',
    color: 'success',
    icon: 'i-heroicons-check-circle'
  })
}

// Обработчик для кнопки выхода с подтверждением
function handleLogout() {
  toast.add({
    title: 'Выход из системы',
    description: 'Выполняется выход...',
    color: 'info',
    duration: 2000
  })
  
  // Небольшая задержка для демонстрации
  setTimeout(() => {
    toast.clear()
    toast.add({
      title: 'Успешный выход',
      description: 'Вы вышли из системы',
      color: 'success',
      icon: 'i-heroicons-check-circle'
    })
    // Вызываем событие logout
    setTimeout(() => {
      emit('logout')
    }, 500)
  }, 1000)
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/mixins' as *;

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: $spacing-unit * 1.5;
  
  @media (min-width: 640px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
}

.action-button {
  @include flex-row-center;
  flex: 1;
  
  @media (min-width: 640px) {
    flex: 0 0 auto;
  }
}

.settings-button {
  margin-right: auto;
}

.logout-button {
  flex: 1;
  
  @media (min-width: 640px) {
    margin-left: auto;
    flex: 0 0 auto;
  }
}
</style> 