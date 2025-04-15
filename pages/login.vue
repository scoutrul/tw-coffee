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

definePageMeta({
  pageTransition: {
    name: 'page'
  }
})

const router = useRouter()
const { login } = useAuth()

async function handleLogin({ email, password }: { email: string, password: string }) {
  // Попытка входа
  const success = await login(email, password)
  
  if (success) {
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