<template>
  <div class="account-page container">
    <UCard>
      <template #header>
        <div class="header-wrapper">
          <div class="user-info">
            <UIcon name="i-heroicons-user-circle-20-solid" class="text-2xl text-primary" />
            <h1 class="m-0">Личный кабинет</h1>
          </div>
          <UButton
            to="/"
            color="neutral"
            variant="soft"
            icon="i-heroicons-arrow-left-20-solid"
            class="nav-button"
          >
            На главную
          </UButton>
        </div>
      </template>

      <div class="account-content">
        <UAlert
          icon="i-heroicons-information-circle"
          color="info"
          variant="soft"
          title="Информация"
          class="mb-4"
        >
          <div class="alert-content">
            Таблица пользователей будет добавлена позже
          </div>
        </UAlert>
        
        <div class="action-buttons">
          <UButton
            color="primary"
            icon="i-heroicons-table-cells-20-solid"
            class="action-button"
          >
            Просмотр таблицы
          </UButton>
          
          <UButton
            color="error"
            icon="i-heroicons-power-20-solid"
            variant="soft"
            class="action-button"
          >
            Выйти из системы
          </UButton>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
// Страница аккаунта с защищенным доступом
definePageMeta({
  pageTransition: {
    name: 'bounce',
    mode: 'out-in'
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/mixins' as *;

.account-page {
  padding: $spacing-unit * 2;
}

.account-content {
  padding: $spacing-unit 0;
}

.header-wrapper {
  @include flex-row-center;
  justify-content: space-between;
}

.user-info {
  @include flex-row-center;
  gap: 0.5rem;
}

.nav-button, 
.action-button {
  @include flex-row-center;
}

.action-buttons {
  @include flex-row-center;
  gap: 0.5rem;
  margin-top: $spacing-unit;
}

.alert-content {
  @include flex-row-center;
}
</style> 