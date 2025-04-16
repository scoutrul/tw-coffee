<template>
  <div class="login-page container">
    <UCard class="login-card">
      <template #header>
        <SharedCardHeader title="Вход в систему" icon="i-heroicons-lock-closed-20-solid" />
      </template>

      <SharedLoginForm @submit="handleLogin" />
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

// Устанавливаем метаданные страницы
definePageMeta({
  title: 'Вход в систему'
})

const router = useRouter()
const { login } = useAuth()
const toast = useCustomToast()

async function handleLogin({ email, password }: { email: string, password: string }) {
  // Используем email в качестве username для совместимости с API аутентификации
  const success = await login(email, password)
  
  if (success) {
    // Показываем уведомление об успешном входе
    toast.add({
      title: 'Вход выполнен',
      description: 'Вы успешно вошли в систему',
      color: 'success',
      icon: 'i-heroicons-check-circle'
    })
    
    // Переход на страницу аккаунта
    router.push('/account')
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/mixins' as *;

.login-page {
  @include flex-column-center;
  justify-content: center;
  min-height: 100vh;
  padding: $spacing-unit;
}

.login-card {
  width: 100%;
  max-width: 450px;
}
</style> 