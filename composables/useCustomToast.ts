import { useToast as useNuxtToast } from '#imports'

export function useCustomToast() {
  const nuxtToast = useNuxtToast()
  
  // Обертка над стандартным toast.add с продолжительностью 30 секунд
  function addToast(options: any): any {
    // Предустановленные опции для всех уведомлений
    const defaultOptions = {
      duration: 30000, // 30 секунд по умолчанию
    }
    
    // Объединяем дефолтные опции с пользовательскими
    return nuxtToast.add({
      ...defaultOptions,
      ...options,
    })
  }
  
  return {
    ...nuxtToast,
    add: addToast
  }
} 