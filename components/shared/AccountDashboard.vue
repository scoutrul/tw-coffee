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
          v-if="!showTable"
          icon="i-heroicons-information-circle"
          color="info"
          variant="soft"
          title="Информация"
          class="mb-4"
        >
          <div class="alert-content">
            <p>Вы можете просмотреть список пользователей системы</p>
            <UButton 
              color="primary"
              variant="soft"
              size="sm"
              class="ms-2"
              icon="i-heroicons-table-cells-20-solid"
              @click="showTable = true"
            >
              Показать таблицу
            </UButton>
          </div>
        </UAlert>
        
        <!-- Таблица пользователей -->
        <template v-if="showTable">
          <div class="table-header mb-3">
            <h3 class="text-lg font-medium">Список пользователей</h3>
            <UButton 
              color="neutral"
              variant="ghost"
              size="sm"
              icon="i-heroicons-x-mark-20-solid"
              @click="showTable = false"
            >
              Скрыть таблицу
            </UButton>
          </div>
          
          <SharedUsersTable class="mb-4" />
        </template>
        
        <!-- Таблица продуктов -->
        <template v-if="showProducts">
          <div class="table-header mb-3">
            <h3 class="text-lg font-medium">Каталог продуктов</h3>
            <UButton 
              color="neutral"
              variant="ghost"
              size="sm"
              icon="i-heroicons-x-mark-20-solid"
              @click="showProducts = false"
            >
              Скрыть каталог
            </UButton>
          </div>
          
          <SharedProductsTable :products="products" class="mb-4" />
        </template>
        
        <SharedActionButtons 
          @table="showTable = true" 
          @products="showProducts = true"
          @logout="$emit('logout')" 
        />
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { User } from '~/types/user'
import type { Product } from '~/types/product'
import { ref, onMounted } from 'vue'

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

// Состояние отображения таблиц
const showTable = ref(false)
const showProducts = ref(false)

// Загрузка данных о продуктах
const products = ref<Product[]>([])

// Загружаем продукты при монтировании компонента
onMounted(async () => {
  try {
    const { data } = await useFetch<Product[]>('/data/products.json')
    products.value = data.value || []
  } catch (error) {
    console.error('Ошибка загрузки продуктов:', error)
  }
})
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
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.table-header {
  @include flex-row-center;
  justify-content: space-between;
}
</style> 