<template>
  <div class="account-page container">
    <UCard>
      <template #header>
        <div class="flex justify-between items-center">
          <h1>Личный кабинет</h1>
          <UButton
            to="/"
            color="neutral"
            variant="soft"
            icon="i-heroicons-arrow-left-20-solid"
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
          Таблица пользователей будет добавлена позже
        </UAlert>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
// Страница аккаунта с защищенным доступом
</script>

<style lang="scss" scoped>
.account-page {
  padding: 2rem;
}

.account-content {
  padding: 1rem 0;
}
</style> 