<template>
  <div class="account-page container">
    <UCard>
      <template #header>
        <div class="header-wrapper">
          <SharedCardHeader title="Личный кабинет" icon="i-heroicons-user-circle-20-solid" />
          
          <UButton
            v-if="showNavButton"
            to="/"
            color="neutral"
            variant="soft"
            icon="i-heroicons-arrow-left-20-solid"
            class="nav-button"
          >
            На главную
          </UButton>
        </div>
      </template>

      <div class="account-content">
        <SharedUserProfile v-if="user" :user="user" class="mb-4" />

        <UAlert
          icon="i-heroicons-information-circle"
          color="info"
          variant="soft"
          title="Информация"
          class="mb-4"
        >
          <div class="alert-content">
            Таблица пользователей будет добавлена позже
          </div>
        </UAlert>
        
        <SharedActionButtons @logout="$emit('logout')" />
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { User } from '~/types/user'

defineProps({
  user: {
    type: [Object, null] as unknown as PropType<User | null>,
    required: false,
    default: null
  },
  showNavButton: {
    type: Boolean,
    default: false
  }
})

defineEmits(['logout'])
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/mixins' as *;

.account-page {
  padding: $spacing-unit * 2;
}

.account-content {
  padding: $spacing-unit 0;
}

.header-wrapper {
  @include flex-row-center;
  justify-content: space-between;
}

.nav-button {
  @include flex-row-center;
}

.alert-content {
  @include flex-row-center;
}
</style> 