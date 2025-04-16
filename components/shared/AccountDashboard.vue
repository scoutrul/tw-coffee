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
          
          <ClientOnly>
            <SharedProductsTable 
              :products="products" 
              :loading="loading" 
              class="mb-4" 
              :key="tableKey" 
            />
          </ClientOnly>
        </template>
        
        <SharedActionButtons 
          @products="toggleProducts" 
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
import { ref, onMounted, nextTick } from 'vue'

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
const showProducts = ref(true)

// Генератор ключей для принудительного перерендеринга компонента
const tableKey = ref(0)

// Функция для переключения отображения каталога
function toggleProducts() {
  showProducts.value = !showProducts.value
  if (showProducts.value) {
    // Принудительное обновление компонента таблицы
    tableKey.value++
  }
}

// Загрузка данных о продуктах
const products = ref<Product[]>([])
const loading = ref(false)

// Загружаем продукты при монтировании компонента
onMounted(async () => {
  try {
    loading.value = true
    const data = await $fetch<Product[]>('/data/products.json')
    products.value = data || []
    
    // Добавляем задержку и принудительно обновляем компонент после загрузки данных
    await nextTick()
    setTimeout(() => {
      tableKey.value++
    }, 100)
  } catch (error) {
    console.error('Ошибка загрузки продуктов:', error)
  } finally {
    loading.value = false
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