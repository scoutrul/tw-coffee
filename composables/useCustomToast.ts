// @ts-ignore - импорт из внутреннего Nuxt API
import { useToast as useNuxtToast } from '#imports'

export function useCustomToast() {
  const nuxtToast = useNuxtToast()
  
  // Простая обертка для сохранения единого интерфейса
  function addToast(options: any): any {
    return nuxtToast.add(options)
  }
  
  return {
    ...nuxtToast,
    add: addToast
  }
} 