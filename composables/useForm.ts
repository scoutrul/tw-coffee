import { ref, reactive } from 'vue'

/**
 * Composable для работы с формами
 * @param initialState - начальное состояние формы
 */
export function useForm<T extends Record<string, any>>(initialState: T) {
  const form = ref<T>({ ...initialState })
  const errors = reactive<Record<string, string>>({})
  const isSubmitting = ref(false)
  
  // Сброс формы в начальное состояние
  function resetForm() {
    form.value = { ...initialState }
    clearErrors()
  }
  
  // Установка значений полей формы
  function setFormData(data: Partial<T>) {
    form.value = { ...form.value, ...data }
  }
  
  // Валидация формы
  function setError(field: string, message: string) {
    errors[field] = message
  }
  
  // Очистка ошибок
  function clearErrors() {
    Object.keys(errors).forEach(key => {
      delete errors[key]
    })
  }
  
  // Проверка наличия ошибок
  function hasErrors(): boolean {
    return Object.keys(errors).length > 0
  }
  
  return {
    form,
    errors,
    isSubmitting,
    resetForm,
    setFormData,
    setError,
    clearErrors,
    hasErrors
  }
} 