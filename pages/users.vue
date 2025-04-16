<template>
  <div class="users-page container">
    <UCard>
      <template #header>
        <div class="header-wrapper">
          <SharedCardHeader title="Управление пользователями" icon="i-heroicons-users-20-solid" />
          
          <UButton
            to="/account"
            color="neutral"
            variant="soft"
            icon="i-heroicons-arrow-left-20-solid"
            class="nav-button"
          >
            В личный кабинет
          </UButton>
        </div>
      </template>

      <div class="page-content">
        <div class="page-filters mb-4">
          <h3 class="text-lg font-medium mb-2">Пользователи системы</h3>
          <p class="text-sm text-muted mb-4">Здесь вы можете просматривать, добавлять, редактировать и удалять пользователей системы.</p>
          
          <div class="action-buttons mb-4">
            <UButton
              color="primary"
              icon="i-heroicons-plus-20-solid"
              @click="showAddUserModal = true"
            >
              Добавить пользователя
            </UButton>
            
            <UButton
              color="neutral"
              variant="soft"
              icon="i-heroicons-arrow-path-20-solid"
              @click="refreshTable"
            >
              Обновить
            </UButton>
          </div>
        </div>
        
        <SharedUsersTable />
      </div>
    </UCard>
    
    <!-- Модальное окно для добавления нового пользователя -->
    <USlideover
      v-model="showAddUserModal"
      class="w-full sm:max-w-lg"
    >
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="i-heroicons-user-plus-20-solid" class="text-primary" />
          <h3 class="text-xl font-medium">Добавление пользователя</h3>
        </div>
      </template>
      
      <div class="p-4">
        <UForm :state="newUser" @submit="addUser" class="space-y-4">
          <UFormGroup label="Имя" name="name">
            <UInput v-model="newUser.name" placeholder="Введите имя" />
          </UFormGroup>
          
          <UFormGroup label="Фамилия" name="surname">
            <UInput v-model="newUser.surname" placeholder="Введите фамилию" />
          </UFormGroup>
          
          <UFormGroup label="Email" name="email">
            <UInput 
              v-model="newUser.email" 
              placeholder="Введите email" 
              type="email" 
              icon="i-heroicons-envelope" 
            />
          </UFormGroup>
          
          <UFormGroup label="Пароль" name="password">
            <UInput 
              v-model="newUser.password" 
              placeholder="Введите пароль" 
              type="password" 
              icon="i-heroicons-lock-closed" 
            />
          </UFormGroup>
          
          <UFormGroup label="Статус">
            <USwitch 
              v-model="newUser.active" 
              :disabled="false" 
              color="primary"
            >
              {{ newUser.active ? 'Активен' : 'Неактивен' }}
            </USwitch>
          </UFormGroup>
          
          <div class="flex justify-end gap-2 mt-6">
            <UButton 
              color="neutral" 
              variant="soft" 
              @click="showAddUserModal = false"
            >
              Отмена
            </UButton>
            
            <UButton 
              type="submit" 
              color="primary"
              loading-icon="i-heroicons-arrow-path"
              loading-auto
            >
              Сохранить
            </UButton>
          </div>
        </UForm>
      </div>
    </USlideover>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { User } from '~/types/user'

// Устанавливаем метаданные страницы
definePageMeta({
  title: 'Управление пользователями'
})

// Создает пустое состояние пользователя
function initialUserState() {
  return {
    name: '',
    surname: '',
    email: '',
    password: '',
    active: true
  }
}

// Форма для нового пользователя
const newUser = ref(initialUserState())
const showAddUserModal = ref(false)
const toast = useCustomToast()

// Обновление таблицы
function refreshTable() {
  toast.add({
    title: 'Обновление данных',
    description: 'Данные таблицы успешно обновлены',
    color: 'success',
    icon: 'i-heroicons-check-circle'
  })
}

// Добавление нового пользователя
function addUser() {
  toast.add({
    title: 'Пользователь добавлен',
    description: `Пользователь ${newUser.value.name} ${newUser.value.surname} успешно добавлен в систему`,
    color: 'success',
    icon: 'i-heroicons-check-circle'
  })
  
  // Сброс формы и закрытие модального окна
  newUser.value = initialUserState()
  showAddUserModal.value = false
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/mixins' as *;

.users-page {
  padding: $spacing-unit * 2;
}

.page-content {
  padding: $spacing-unit 0;
}

.header-wrapper {
  @include flex-row-center;
  justify-content: space-between;
}

.nav-button {
  @include flex-row-center;
}

.action-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style> 