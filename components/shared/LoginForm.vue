<template>
  <UForm :state="form" class="login-form" @submit="handleSubmit" :validate="validateForm">
    <div class="form-group">
      <label for="email">Email</label>
      <UInput
        id="email"
        v-model="form.email"
        placeholder="Введите email"
        icon="i-heroicons-envelope"
        size="lg"
        :disabled="loading"
      />
      <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
    </div>

    <div class="form-group">
      <label for="password">Пароль</label>
      <UInput
        id="password"
        v-model="form.password"
        type="password"
        placeholder="Введите пароль"
        icon="i-heroicons-lock-closed"
        size="lg"
        :disabled="loading"
      />
      <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
    </div>

    <UAlert
      v-if="authError"
      icon="i-heroicons-exclamation-triangle"
      color="error"
      variant="soft"
      title="Ошибка авторизации"
      class="mb-4"
    >
      {{ authError }}
    </UAlert>

    <div class="form-actions">
      <UButton
        type="submit"
        color="primary"
        size="lg"
        block
        :loading="loading"
        loading-icon="i-heroicons-arrow-path"
        icon="i-heroicons-arrow-right-circle-20-solid"
        trailing
        loading-auto
      >
        {{ submitText }}
      </UButton>
    </div>
  </UForm>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useToast } from '#imports'

const props = defineProps({
  submitText: {
    type: String,
    default: 'Войти'
  }
})

const emit = defineEmits(['submit'])

const { error: authError, loading } = useAuth()
const toast = useToast()

const form = ref({
  email: '',
  password: ''
})

const errors = reactive({
  email: '',
  password: ''
})

// Отслеживаем изменение ошибки авторизации
watch(() => authError.value, (newError) => {
  if (newError) {
    toast.add({
      title: 'Ошибка входа',
      description: newError,
      color: 'error',
      icon: 'i-heroicons-exclamation-triangle'
    })
  }
})

// Валидация формы для UForm
async function validateForm(state: Partial<typeof form.value>) {
  // Сбрасываем ошибки
  errors.email = ''
  errors.password = ''
  
  const validationErrors = []
  
  // Валидация email
  if (!state.email) {
    errors.email = 'Email обязателен'
    validationErrors.push({ path: 'email', message: errors.email })
  } else if (state.email && !state.email.includes('@')) {
    errors.email = 'Введите корректный email'
    validationErrors.push({ path: 'email', message: errors.email })
  }
  
  // Валидация пароля
  if (!state.password) {
    errors.password = 'Пароль обязателен'
    validationErrors.push({ path: 'password', message: errors.password })
  } else if (state.password && state.password.length < 3) {
    errors.password = 'Пароль должен содержать не менее 3 символов'
    validationErrors.push({ path: 'password', message: errors.password })
  }
  
  // Показываем тост, если есть ошибки валидации
  if (validationErrors.length > 0) {
    toast.add({
      title: 'Ошибка ввода данных',
      description: 'Пожалуйста, проверьте корректность заполнения формы',
      color: 'warning',
      icon: 'i-heroicons-exclamation-circle'
    })
  }
  
  return validationErrors
}

async function handleSubmit() {
  // Вызываем событие submit с данными формы
  emit('submit', {
    email: form.value.email,
    password: form.value.password
  })
  
  // Уведомления показываются в компоненте страницы логина
  // через функцию handleLogin
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/mixins' as *;

.login-form {
  margin-top: $spacing-unit;
  text-align: left;
}

.form-group {
  margin-bottom: $spacing-unit;
  
  label {
    display: block;
    margin-bottom: $spacing-unit * 0.25;
    font-weight: $font-weight-medium;
  }
}

.form-actions {
  margin-top: $spacing-unit * 1.5;
}
</style> 