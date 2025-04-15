<template>
  <div class="login-page">
    <h1>Вход в Империю Кофе</h1>
    <div class="login-form">
      <!-- Здесь будет форма логина -->
      <p>Форма авторизации будет добавлена позже</p>
      <NuxtLink to="/" class="link">Вернуться на главную</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
// Страница логина
</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
}

.login-form {
  margin-top: 2rem;
  text-align: center;
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