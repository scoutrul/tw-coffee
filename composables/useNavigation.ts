import { useRouter } from 'vue-router'

// Константы для путей
export const Routes = {
  HOME: '/',
  LOGIN: '/login',
  ACCOUNT: '/account',
  USERS: '/users'
}

export function useNavigation() {
  const router = useRouter()
  
  function goToLogin() {
    router.push(Routes.LOGIN)
  }
  
  function goToAccount() {
    router.push(Routes.ACCOUNT)
  }
  
  function goToHome() {
    router.push(Routes.HOME)
  }
  
  function goToUsers() {
    router.push(Routes.USERS) 
  }

  return {
    goToLogin,
    goToAccount,
    goToHome,
    goToUsers,
    // Общий метод для навигации
    navigateTo: router.push
  }
} 