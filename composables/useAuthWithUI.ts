import { useAuth } from './useAuth'
import { useToast } from '#imports'
import { useNavigation } from './useNavigation'

export function useAuthWithUI() {
  const auth = useAuth()
  const toast = useToast()
  const navigation = useNavigation()
  
  // Логин с уведомлением и навигацией
  async function loginWithUI(username: string, password: string) {
    const success = await auth.login(username, password)
    
    if (success) {
      toast.add({
        title: 'Вход выполнен',
        description: 'Вы успешно вошли в систему',
        color: 'success',
        icon: 'i-heroicons-check-circle'
      })
      
      navigation.goToAccount()
      return true
    } else {
      // Сообщение об ошибке уже установлено в useAuth
      return false
    }
  }
  
  // Выход с уведомлением и навигацией
  function logoutWithUI() {
    toast.add({
      title: 'Выход из системы',
      description: 'Выполняется выход...',
      color: 'primary',
      icon: 'i-heroicons-power-20-solid'
    })
    
    setTimeout(() => {
      auth.logout()
      navigation.goToLogin()
    }, 1000)
  }
  
  return {
    ...auth,
    loginWithUI,
    logoutWithUI
  }
} 