<template>
  <div class="welcome-page container">
    <UCard class="welcome-card">
      <template #header>
        <h1 class="text-center">Империя Кофе</h1>
      </template>

      <div class="text-center py-4">
        <p>Веб-приложение для управления данными пользователей</p>
        <UDivider />
        <UButton
          to="/login"
          color="primary"
          size="lg"
          class="mt-4"
        >
          Войти в систему
        </UButton>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
// Главная страница приложения
</script>

<style lang="scss" scoped>
.welcome-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
}

.welcome-card {
  width: 100%;
  max-width: 550px;
}
</style> 