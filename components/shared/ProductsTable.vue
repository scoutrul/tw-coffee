<template>
  <div class="products-table-wrapper">
    <!-- Фильтры -->
    <UCard class="mb-4">
      <template #header>
        <SharedCardHeader title="Фильтры" icon="i-heroicons-funnel-20-solid" />
      </template>
      
      <div class="filters-form">
        <!-- Фильтр по дате создания -->
        <div class="filter-group">
          <label>Дата создания</label>
          <div class="date-range">
            <UInput
              v-model="dateFilter.start"
              type="date"
              placeholder="С"
              icon="i-heroicons-calendar"
            />
            <UInput
              v-model="dateFilter.end"
              type="date"
              placeholder="По"
              icon="i-heroicons-calendar"
            />
          </div>
        </div>
        
        <!-- Мультивыбор по категории -->
        <div class="filter-group">
          <label>Категория</label>
          <USelectMenu
            v-model="selectedCategories"
            :options="categoryOptions"
            placeholder="Выберите категории"
            multiple
          />
        </div>
        
        <!-- Фильтр по статусу -->
        <div class="filter-group">
          <label>Статус</label>
          <USelectMenu
            v-model="selectedStatus"
            :options="statusOptions"
            placeholder="Статус товара"
            option-attribute="label"
            value-attribute="value"
          />
        </div>
      </div>
      
      <template #footer>
        <div class="filter-actions">
          <UButton
            color="neutral"
            variant="soft"
            @click="resetFilters"
            icon="i-heroicons-arrow-path"
          >
            Сбросить
          </UButton>
          <UButton
            color="primary"
            @click="applyFilters"
            icon="i-heroicons-funnel"
          >
            Применить
          </UButton>
        </div>
      </template>
    </UCard>
    
    <!-- Таблица продуктов -->
    <UTable 
      :columns="columns" 
      :rows="paginatedProducts" 
      :loading="loading"
      :empty-state="{ icon: 'i-heroicons-shopping-bag', label: 'Товары не найдены' }"
      :sort="sort"
      @update:sort="sort = $event"
    >
      <template #status-data="{ row }">
        <UBadge :color="getProduct(row).status === 'available' ? 'success' : 'error'" size="sm">
          {{ getProduct(row).status === 'available' ? 'В наличии' : 'Отсутствует' }}
        </UBadge>
      </template>
      
      <template #date_created-data="{ row }">
        {{ formatDate(getProduct(row).date_created) }}
      </template>
      
      <template #price-data="{ row }">
        {{ formatPrice(getProduct(row).price) }}
      </template>
    </UTable>
    
    <!-- Пагинация -->
    <div class="mt-4 flex justify-end">
      <UPagination 
        v-model="page" 
        :page-count="pageCount" 
        :total="filteredProducts.length"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Product } from '~/types/product'
import type { TableColumn } from '#ui/types'

// Вспомогательная функция для безопасного получения продукта из row
function getProduct(row: any): Product {
  return row as Product
}

const props = defineProps({
  products: {
    type: Array as () => Product[],
    default: () => []
  }
})

// Состояние загрузки
const loading = ref(false)

// Фильтры
const dateFilter = ref({
  start: '',
  end: ''
})
const selectedCategories = ref<string[]>([])
const selectedStatus = ref('')

// Опции для выбора статуса
const statusOptions = [
  { label: 'Все товары', value: '' },
  { label: 'В наличии', value: 'available' },
  { label: 'Отсутствует', value: 'unavailable' }
]

// Уникальные категории из списка продуктов
const categoryOptions = computed(() => {
  const categories = new Set<string>()
  props.products.forEach(product => {
    categories.add(product.category)
  })
  return Array.from(categories)
})

// Сортировка
const sort = ref({
  column: 'name',
  direction: 'asc'
})

// Пагинация
const page = ref(1)
const perPage = ref(5)
const pageCount = computed(() => Math.ceil(filteredProducts.value.length / perPage.value))

// Определение колонок таблицы
const columns = [
  {
    key: 'id',
    label: 'ID',
    sortable: true
  },
  {
    key: 'name',
    label: 'Название',
    sortable: true
  },
  {
    key: 'category',
    label: 'Категория',
    sortable: true
  },
  {
    key: 'price',
    label: 'Цена',
    sortable: true
  },
  {
    key: 'status',
    label: 'Статус'
  },
  {
    key: 'date_created',
    label: 'Дата создания',
    sortable: true
  }
] as unknown as TableColumn<Product, keyof Product>[]

// Преобразование строки даты в объект Date для сравнения
function parseDate(dateStr: string): Date {
  return new Date(dateStr)
}

// Преобразование даты из формата input[type=date] в формат для сравнения
function formatDateForComparison(inputDate: string): Date | null {
  if (!inputDate) return null
  return new Date(inputDate)
}

// Форматирование даты для отображения
function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

// Форматирование цены
function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB'
  }).format(price)
}

// Фильтрация продуктов
const filteredProducts = computed(() => {
  return props.products.filter(product => {
    // Фильтр по статусу
    if (selectedStatus.value && product.status !== selectedStatus.value) {
      return false
    }
    
    // Фильтр по категории
    if (selectedCategories.value.length > 0 && !selectedCategories.value.includes(product.category)) {
      return false
    }
    
    // Фильтр по дате создания
    const productDate = parseDate(product.date_created)
    const startDate = formatDateForComparison(dateFilter.value.start)
    const endDate = formatDateForComparison(dateFilter.value.end)
    
    if (startDate && productDate < startDate) {
      return false
    }
    
    if (endDate) {
      // Устанавливаем конец дня для даты окончания
      endDate.setHours(23, 59, 59, 999)
      if (productDate > endDate) {
        return false
      }
    }
    
    return true
  }).sort((a, b) => {
    const column = sort.value.column
    const direction = sort.value.direction === 'asc' ? 1 : -1
    
    if (!column) return 0
    
    // Сортировка по числовым полям
    if (column === 'id' || column === 'price') {
      const aValue = Number(a[column as keyof Product])
      const bValue = Number(b[column as keyof Product])
      return direction * (aValue - bValue)
    }
    
    // Сортировка по дате
    if (column === 'date_created') {
      return direction * (new Date(a.date_created).getTime() - new Date(b.date_created).getTime())
    }
    
    // Сортировка по строковым полям
    const aValue = String(a[column as keyof Product] || '')
    const bValue = String(b[column as keyof Product] || '')
    return direction * aValue.localeCompare(bValue)
  })
})

// Пагинированные продукты
const paginatedProducts = computed(() => {
  const start = (page.value - 1) * perPage.value
  const end = start + perPage.value
  return filteredProducts.value.slice(start, end)
})

// Функция сброса фильтров
function resetFilters() {
  dateFilter.value = {
    start: '',
    end: ''
  }
  selectedCategories.value = []
  selectedStatus.value = ''
  page.value = 1
}

// Функция применения фильтров
function applyFilters() {
  page.value = 1
}

// При изменении фильтров сбрасываем страницу
watch([dateFilter, selectedCategories, selectedStatus], () => {
  page.value = 1
}, { deep: true })

// Экспортируем метод для родительского компонента
defineExpose({
  resetFilters
})
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/mixins' as *;

.products-table-wrapper {
  width: 100%;
}

.filters-form {
  display: flex;
  flex-direction: column;
  gap: $spacing-unit;
}

.filter-group {
  margin-bottom: $spacing-unit;
  
  label {
    display: block;
    margin-bottom: $spacing-unit * 0.5;
    font-weight: $font-weight-medium;
  }
}

.date-range {
  display: flex;
  gap: $spacing-unit;
  
  @media (max-width: 640px) {
    flex-direction: column;
  }
}

.filter-actions {
  display: flex;
  justify-content: flex-end;
  gap: $spacing-unit;
}
</style>
