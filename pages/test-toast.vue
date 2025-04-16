<template>
  <div class="test-toast-page">
    <h1>Тестирование Toast уведомлений</h1>
    
    <div class="toast-buttons">
      <UButton color="success" @click="showSuccessToast">Успешно</UButton>
      <UButton color="error" @click="showErrorToast">Ошибка</UButton>
      <UButton color="info" @click="showInfoToast">Информация</UButton>
      <UButton color="warning" @click="showWarningToast">Предупреждение</UButton>
      <UButton color="primary" @click="showCustomToast">С действиями</UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
// Используем напрямую стандартный toast из Nuxt UI
import { useToast } from '#imports'

// Устанавливаем метаданные страницы
definePageMeta({
  title: 'Тестирование Toast уведомлений'
})

// Получаем toast сервис
const toast = useToast()

// Тестовые функции для разных типов тостов
function showSuccessToast() {
  toast.add({
    title: 'Успешно',
    description: 'Операция успешно выполнена!',
    color: 'success',
    icon: 'i-heroicons-check-circle'
  })
}

function showErrorToast() {
  toast.add({
    title: 'Ошибка',
    description: 'Произошла ошибка при выполнении операции.',
    color: 'error',
    icon: 'i-heroicons-x-circle'
  })
}

function showInfoToast() {
  toast.add({
    title: 'Информация',
    description: 'Обратите внимание на важную информацию.',
    color: 'info',
    icon: 'i-heroicons-information-circle'
  })
}

function showWarningToast() {
  toast.add({
    title: 'Предупреждение',
    description: 'Необходимо подтвердить действие перед продолжением.',
    color: 'warning',
    icon: 'i-heroicons-exclamation-triangle'
  })
}

function showCustomToast() {
  toast.add({
    title: 'Выполнить действие?',
    description: 'Это действие нельзя будет отменить.',
    color: 'primary',
    icon: 'i-heroicons-question-mark-circle',
    actions: [
      {
        label: 'Подтвердить',
        color: 'primary',
        variant: 'solid',
        onClick: () => {
          showSuccessToast()
        }
      },
      {
        label: 'Отмена',
        color: 'neutral',
        variant: 'outline',
        onClick: () => {
          showInfoToast()
        }
      }
    ]
  })
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/mixins' as *;

.test-toast-page {
  padding: $spacing-unit * 2;
  
  h1 {
    margin-bottom: $spacing-unit * 2;
  }
  
  .toast-buttons {
    display: flex;
    gap: $spacing-unit;
    flex-wrap: wrap;
  }
}
</style> 