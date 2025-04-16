<script setup>
// Устанавливаем глобальные метатеги
useHead({
  titleTemplate: '%s | Империя Кофе',
  meta: [
    { name: 'description', content: 'Управление бизнесом по продаже кофе' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { charset: 'utf-8' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png' }
  ]
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <SharedToastProvider />
  </UApp>
</template>

<style>
/* Переход между страницами */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Переход между макетами */
.layout-enter-active,
.layout-leave-active {
  transition: all 0.3s ease;
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  filter: blur(1px);
}

/* Переход с эффектом bounce */
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0.9);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Стили для Toast уведомлений */
.custom-toast {
  margin-bottom: 0.5rem !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
  border-radius: 0.375rem !important;
  overflow: hidden !important;
}
</style>
