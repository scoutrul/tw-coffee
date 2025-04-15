<template>
  <div>
    <!-- Компонент главной страницы -->
    <SharedWelcomeCard v-if="!isAuthenticated" @login-submit="handleLoginSubmit" />

    <!-- Если пользователь авторизован, показываем компонент аккаунта -->
    <SharedAccountDashboard v-else :user="user" @logout="handleLogout" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

definePageMeta({
  pageTransition: {
    name: 'page'
  }
})

const router = useRouter()
const { login, logout, isAuthenticated, user } = useAuth()

async function handleLoginSubmit(formData: { email: string; password: string }) {
  await login(formData.email, formData.password)
}

function handleLogout() {
  logout()
}
</script> 