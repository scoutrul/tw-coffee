<template>
  <div class="user-details">
    <h2 v-if="showTitle">Информация о пользователе</h2>
    <div class="user-profile">
      <div class="detail-item">
        <span class="detail-label">Имя:</span>
        <span class="detail-value">{{ user.name }} {{ user.surname }}</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Email:</span>
        <span class="detail-value">{{ user.credentials.username }}</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Дата регистрации:</span>
        <span class="detail-value">{{ user.created }}</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Статус:</span>
        <UBadge :color="user.active ? 'success' : 'error'">
          {{ user.active ? 'Активен' : 'Не активен' }}
        </UBadge>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '~/types/user'

defineProps({
  user: {
    type: Object as () => User,
    required: true
  },
  showTitle: {
    type: Boolean,
    default: true
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/mixins' as *;

.user-details {
  background-color: $background-color;
  border-radius: $border-radius;
  padding: $spacing-unit;
}

.user-profile {
  display: grid;
  gap: $spacing-unit * 0.5;
}

.detail-item {
  @include flex-row-center;
  gap: $spacing-unit;
}

.detail-label {
  font-weight: $font-weight-bold;
  min-width: 150px;
}

.detail-value {
  color: $text-color;
}
</style> 