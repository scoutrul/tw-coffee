<template>
  <div class="login-page container">
    <UCard class="login-card">
      <template #header>
        <h1 class="text-center">Вход в Империю Кофе</h1>
      </template>

      <div class="login-form">
        <p class="text-center text-gray-500 mb-4">Форма авторизации будет добавлена позже</p>
        
        <UDivider />
        
        <div class="text-center mt-4">
          <UButton
            to="/"
            variant="link"
            color="primary"
          >
            Вернуться на главную
          </UButton>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
// Страница логина
</script>

<style lang="scss" scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
}

.login-card {
  width: 100%;
  max-width: 450px;
}

.login-form {
  padding: 1rem;
}
</style> 