<template>
  <SharedAccountDashboard 
    :user="user" 
    :show-nav-button="true" 
    @logout="handleLogout" 
  />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useToast } from '#imports'

// Устанавливаем метаданные страницы
definePageMeta({
  title: 'Личный кабинет'
})

// Страница аккаунта с защищенным доступом
const { user, logout } = useAuth()
const router = useRouter()
const toast = useToast()

function handleLogout() {
  logout()
  toast.add({
    title: 'Выход из системы',
    description: 'Вы успешно вышли из системы',
    color: 'info',
    icon: 'i-heroicons-arrow-left-circle'
  })
  router.push('/login')
}
</script> 