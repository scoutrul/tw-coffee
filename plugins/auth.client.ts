// Этот плагин будет запускаться только на стороне клиента
// для инициализации состояния аутентификации из localStorage
export default defineNuxtPlugin(() => {
  const { initAuth } = useAuth()

  // Инициализация состояния аутентификации из localStorage
  initAuth()
}) 