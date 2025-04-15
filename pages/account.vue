<template>
  <div class="account-page">
    <h1>Личный кабинет</h1>
    <div class="account-content">
      <!-- Здесь будет таблица и фильтры -->
      <p>Таблица пользователей будет добавлена позже</p>
      <NuxtLink to="/" class="link">Вернуться на главную</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
// Страница аккаунта с защищенным доступом
</script>

<style scoped>
.account-page {
  padding: 2rem;
}

.account-content {
  margin-top: 2rem;
}

.link {
  display: inline-block;
  margin-top: 1rem;
  color: #4CAF50;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style> 