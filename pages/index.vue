<template>
  <div class="welcome-page container">
    <UCard class="welcome-card">
      <template #header>
        <div class="header-title">
          <UIcon name="i-heroicons-coffee-20-solid" class="text-2xl text-primary" />
          <h1 class="text-center m-0">Империя Кофе</h1>
        </div>
      </template>

      <div class="text-center py-4">
        <p>Веб-приложение для управления данными пользователей</p>
        <USeparator />
        <UButton
          to="/login"
          color="primary"
          size="lg"
          class="mt-4 login-button"
          icon="i-heroicons-arrow-right-circle-20-solid"
          trailing
        >
          Войти в систему
        </UButton>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
// Главная страница приложения
definePageMeta({
  pageTransition: {
    name: 'page'
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/mixins' as *;

.welcome-page {
  @include flex-column-center;
  justify-content: center;
  min-height: 100vh;
  padding: $spacing-unit;
}

.welcome-card {
  width: 100%;
  max-width: 550px;
}

.header-title {
  @include flex-center;
  gap: 0.5rem;
}

.login-button {
  @include flex-row-center;
}
</style> 