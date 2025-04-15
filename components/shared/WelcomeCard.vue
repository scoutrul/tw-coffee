<template>
  <div class="welcome-page container">
    <UCard class="welcome-card">
      <template #header>
        <SharedCardHeader title="Империя Кофе" icon="i-heroicons-beaker-20-solid" class="text-center" />
      </template>

      <div class="text-center py-4">
        <p>Веб-приложение для управления данными пользователей</p>
        <USeparator />
        
        <!-- Форма входа непосредственно на главной -->
        <SharedLoginForm @submit="$emit('login-submit', $event)" />
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
defineEmits(['login-submit'])
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
</style> 