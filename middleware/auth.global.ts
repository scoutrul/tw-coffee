export default defineNuxtRouteMiddleware((to) => {
  // Инициализация хука аутентификации
  const { isAuthenticated, initAuth } = useAuth()
  
  // Загружаем авторизацию из localStorage при первом запуске
  initAuth()

  // Пути, доступные без аутентификации
  const publicRoutes = ['/', '/login']
  
  // Если пользователь не авторизован и пытается открыть закрытую страницу
  if (!isAuthenticated.value && !publicRoutes.includes(to.path)) {
    return navigateTo('/')
  }
  
  // Если пользователь авторизован и пытается открыть страницу логина
  if (isAuthenticated.value && to.path === '/login') {
    return navigateTo('/')
  }
}) 