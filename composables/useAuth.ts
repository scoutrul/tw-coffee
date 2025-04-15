import { ref, computed } from 'vue'
import md5 from 'md5'
import type { User, AuthState } from '~/types/user'

// Состояние аутентификации (будет храниться между компонентами)
const authState = ref<AuthState>({
  user: null,
  isAuthenticated: false,
  error: null,
  loading: false
})

export function useAuth() {
  // Загрузка состояния аутентификации из хранилища при инициализации
  function initAuth() {
    if (process.client) {
      const savedAuth = localStorage.getItem('auth')
      if (savedAuth) {
        try {
          const parsedAuth = JSON.parse(savedAuth)
          authState.value = parsedAuth
        } catch (e) {
          console.error('Failed to parse auth from localStorage', e)
          // Сбрасываем состояние при ошибке
          resetAuth()
        }
      }
    }
  }

  // Проверка хеша введенного пароля с хешем из БД
  function verifyCredentials(username: string, password: string): Promise<User | null> {
    authState.value.loading = true
    authState.value.error = null

    return $fetch<User[]>('/data/users.json')
      .then((users) => {
        // Найти пользователя по имени пользователя
        const user = users.find(u => u.credentials.username === username)
        
        if (!user) {
          throw new Error('Пользователь не найден')
        }
        
        if (!user.active) {
          throw new Error('Аккаунт деактивирован')
        }
        
        // Проверка пароля
        const passwordHash = md5(password)
        if (passwordHash !== user.credentials.passphrase) {
          throw new Error('Неверный пароль')
        }
        
        return user
      })
      .catch(error => {
        console.error('Authentication error:', error)
        authState.value.error = error.message || 'Введены неверные данные авторизации. Попробуйте ещё раз'
        return null
      })
      .finally(() => {
        authState.value.loading = false
      })
  }

  // Логин пользователя
  async function login(username: string, password: string): Promise<boolean> {
    try {
      const user = await verifyCredentials(username, password)
      
      if (user) {
        authState.value.user = user
        authState.value.isAuthenticated = true
        authState.value.error = null
        
        // Сохраняем состояние в localStorage для сохранения сессии
        if (process.client) {
          localStorage.setItem('auth', JSON.stringify(authState.value))
        }
        
        return true
      }
      
      return false
    } catch (error: any) {
      authState.value.error = error.message || 'Произошла ошибка при авторизации'
      return false
    }
  }

  // Выход из системы
  function logout() {
    authState.value.user = null
    authState.value.isAuthenticated = false
    
    // Удаляем данные из localStorage
    if (process.client) {
      localStorage.removeItem('auth')
    }
  }

  // Сброс состояния аутентификации
  function resetAuth() {
    authState.value = {
      user: null,
      isAuthenticated: false,
      error: null,
      loading: false
    }
    
    if (process.client) {
      localStorage.removeItem('auth')
    }
  }

  // Геттеры для доступа к состоянию
  const isAuthenticated = computed(() => authState.value.isAuthenticated)
  const user = computed(() => authState.value.user)
  const error = computed(() => authState.value.error)
  const loading = computed(() => authState.value.loading)
  
  return {
    authState,
    isAuthenticated,
    user,
    error,
    loading,
    login,
    logout,
    resetAuth,
    initAuth
  }
} 