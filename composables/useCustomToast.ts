import { useToast as useNuxtToast } from '#imports'

export function useCustomToast() {
  const nuxtToast = useNuxtToast()
  
  // Обертка над стандартным toast.add без переопределения продолжительности
  function addToast(options: any): any {
    // Используем только пользовательские опции, не переопределяя продолжительность
    // Глобальные настройки берутся из app.config.ts
    return nuxtToast.add(options)
  }
  
  return {
    ...nuxtToast,
    add: addToast
  }
} 