<template>
  <div class="login-page container">
    <UCard class="login-card">
      <template #header>
        <div class="card-header">
          <UIcon name="i-heroicons-coffee-20-solid" class="text-2xl text-primary" />
          <h1 class="m-0">Вход в систему</h1>
        </div>
      </template>

      <UForm
        :state="form"
        class="login-form"
        @submit="onSubmit"
      >
        <UFormGroup
          label="Email"
          name="email"
        >
          <UInput
            v-model="form.email"
            placeholder="Введите email"
            icon="i-heroicons-envelope"
            size="lg"
          />
        </UFormGroup>

        <UFormGroup
          label="Пароль"
          name="password"
        >
          <UInput
            v-model="form.password"
            type="password"
            placeholder="Введите пароль"
            icon="i-heroicons-lock-closed"
            size="lg"
          />
        </UFormGroup>

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
            Войти
          </UButton>
        </div>
      </UForm>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

definePageMeta({
  pageTransition: {
    name: 'page'
  }
})

const router = useRouter()
const loading = ref(false)

const form = ref({
  email: '',
  password: ''
})

async function onSubmit() {
  loading.value = true
  // Имитация аутентификации
  await new Promise(resolve => setTimeout(resolve, 1000))
  loading.value = false
  router.push('/account')
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/mixins' as *;

.login-page {
  @include flex-column-center;
  justify-content: center;
  min-height: 100vh;
  padding: $spacing-unit;
}

.login-card {
  width: 100%;
  max-width: 450px;
}

.card-header {
  @include flex-center;
  gap: 0.5rem;
}

.login-form {
  padding: $spacing-unit 0;
}

.form-actions {
  margin-top: $spacing-unit * 1.5;
}
</style> 