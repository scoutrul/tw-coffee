export default defineNuxtPlugin({
  name: 'page-title',
  setup() {
    // Следим за изменениями маршрута
    const route = useRoute()
    
    // При изменении маршрута устанавливаем заголовок страницы
    watch(() => route.meta.title, (newTitle) => {
      if (newTitle) {
        useHead({
          title: newTitle as string
        })
      } else {
        // Если заголовок не указан, используем название приложения
        useHead({
          title: 'Главная'
        })
      }
    }, { immediate: true })
  }
}) 