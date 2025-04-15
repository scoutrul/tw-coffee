// Константы для ключей хранилища
export const StorageKeys = {
  AUTH: 'auth',
  THEME: 'theme',
  LANGUAGE: 'language',
  USER_SETTINGS: 'user_settings'
}

/**
 * Вспомогательные функции для работы с localStorage
 */
export const storage = {
  /**
   * Сохранить данные в localStorage
   */
  set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.error(`Error saving to localStorage: ${key}`, e)
    }
  },
  
  /**
   * Получить данные из localStorage
   */
  get<T>(key: string, defaultValue: T | null = null): T | null {
    if (typeof window === 'undefined') return defaultValue

    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (e) {
      console.error(`Error reading from localStorage: ${key}`, e)
      return defaultValue
    }
  },
  
  /**
   * Удалить данные из localStorage
   */
  remove(key: string): void {
    if (typeof window === 'undefined') return

    try {
      localStorage.removeItem(key)
    } catch (e) {
      console.error(`Error removing from localStorage: ${key}`, e)
    }
  },
  
  /**
   * Очистить все данные в localStorage
   */
  clear(): void {
    if (typeof window === 'undefined') return

    try {
      localStorage.clear()
    } catch (e) {
      console.error('Error clearing localStorage', e)
    }
  }
} 