<template>
  <div class="welcome-page">
    <h1>Империя Кофе</h1>
    <p>Веб-приложение для управления данными пользователей</p>
    <div class="actions">
      <NuxtLink to="/login" class="button">Войти в систему</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
// Главная страница приложения
</script>

<style scoped>
.welcome-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  padding: 1rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.actions {
  margin-top: 2rem;
}

.button {
  display: inline-block;
  background-color: #4CAF50;
  color: white;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #45a049;
}
</style> 