<template>
  <form class="login-form" @submit.prevent="onSubmit">
    <div class="form-group">
      <label for="email">Email</label>
      <UInput
        id="email"
        v-model="form.email"
        placeholder="Введите email"
        icon="i-heroicons-envelope"
        size="lg"
        :disabled="loading"
        :color="emailError ? 'error' : undefined"
      />
      <p v-if="emailError" class="form-error">{{ emailError }}</p>
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
        :color="passwordError ? 'error' : undefined"
      />
      <p v-if="passwordError" class="form-error">{{ passwordError }}</p>
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
        icon="i-heroicons-arrow-right-circle-20-solid"
        trailing
      >
        {{ submitText }}
      </UButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps({
  submitText: {
    type: String,
    default: 'Войти'
  }
})

const emit = defineEmits(['submit'])

const { error: authError, loading } = useAuth()

const form = ref({
  email: '',
  password: ''
})

// Валидация формы
const emailError = computed(() => {
  if (!form.value.email) return ''
  if (!form.value.email.includes('@')) 
    return 'Введите корректный email'
  return ''
})

const passwordError = computed(() => {
  if (!form.value.password) return ''
  if (form.value.password.length < 3) 
    return 'Пароль должен содержать не менее 3 символов'
  return ''
})

async function onSubmit() {
  // Проверка формы
  if (emailError.value || passwordError.value) {
    return
  }

  // Вызываем событие submit с данными формы
  emit('submit', {
    email: form.value.email,
    password: form.value.password
  })
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

.form-error {
  color: $error-color;
  font-size: $font-size-sm;
  margin-top: $spacing-unit * 0.25;
}

.form-actions {
  margin-top: $spacing-unit * 1.5;
}
</style> 