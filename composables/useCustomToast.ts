// @ts-ignore - импорт из внутреннего Nuxt API
import { useToast as useNuxtToast } from '#imports'

export function useCustomToast() {
  const nuxtToast = useNuxtToast()
  
  // Обертка над стандартным toast.add без переопределения продолжительности
  function addToast(options: any): any {
    // Используем только пользовательские опции с явным указанием иконки закрытия
    return nuxtToast.add({
      closeButton: {
        icon: 'i-heroicons-x-mark-20-solid'
      },
      ...options,
    })
  }
  
  return {
    ...nuxtToast,
    add: addToast
  }
} 