<template>
  <div class="welcome-page container">
    <ClientOnly>
      <!-- Компонент главной страницы -->
      <SharedWelcomeCard v-if="!isAuthenticated" @login-submit="handleLoginSubmit" />

      <!-- Если пользователь авторизован, показываем компонент аккаунта -->
      <SharedAccountDashboard v-else :user="user" @logout="handleLogout" />
      
      <template #fallback>
        <div class="loading-container">
          <p>Загрузка...</p>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

// Устанавливаем метаданные страницы
definePageMeta({
  title: 'Главная'
})

const router = useRouter()
const { login, logout, isAuthenticated, user } = useAuth()

async function handleLoginSubmit(formData: { email: string; password: string }) {
  const success = await login(formData.email, formData.password)
  if (success) {
    router.push('/account')
  }
}

function handleLogout() {
  logout()
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/mixins' as *;

.welcome-page {
  padding: $spacing-unit * 2;
}

.loading-container {
  @include flex-column-center;
  justify-content: center;
  min-height: 300px;
}
</style> 