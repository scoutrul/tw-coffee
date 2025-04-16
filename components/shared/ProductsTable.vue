<template>
  <div class="products-table-wrapper">
    <!-- Наша реализация пагинации -->
    <div v-if="props.products.length > 0" class="mb-4 flex justify-center gap-2">
      <!-- Кнопка "В начало" -->
      <UButton
        icon="i-heroicons-chevron-double-left-20-solid"
        color="neutral"
        variant="soft"
        :disabled="page <= 1"
        @click="goToPage(1)"
        aria-label="Первая страница"
      />
      
      <!-- Кнопка "Назад" -->
      <UButton
        icon="i-heroicons-chevron-left-20-solid"
        color="neutral"
        variant="soft"
        :disabled="page <= 1"
        @click="goToPage(page - 1)"
        aria-label="Предыдущая страница"
      />
      
      <!-- Номера страниц -->
      <UButton
        v-for="p in visiblePageNumbers"
        :key="p"
        :variant="p === page ? 'solid' : 'soft'"
        color="primary"
        @click="goToPage(p)"
      >
        {{ p }}
      </UButton>
      
      <!-- Кнопка "Вперед" -->
      <UButton
        icon="i-heroicons-chevron-right-20-solid"
        color="neutral"
        variant="soft"
        :disabled="page >= pageCount"
        @click="goToPage(page + 1)"
        aria-label="Следующая страница"
      />
      
      <!-- Кнопка "В конец" -->
      <UButton
        icon="i-heroicons-chevron-double-right-20-solid"
        color="neutral"
        variant="soft"
        :disabled="page >= pageCount"
        @click="goToPage(pageCount)"
        aria-label="Последняя страница"
      />
    </div>
    
    <!-- Таблица продуктов -->
    <UTable
      :data="paginatedProducts"
      :loading="isLoading"
      :empty-state="{ icon: 'i-heroicons-shopping-bag', label: 'Товары не найдены' }"
      :key="tableKey"
    >
      <template #loading>
        <div class="p-3">Загрузка данных...</div>
      </template>
    </UTable>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, nextTick } from 'vue'
import type { Product } from '~/types/product'

const props = defineProps({
  products: {
    type: Array as () => Product[],
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

// Состояние загрузки
const tableLoading = ref(false)

// Вычисляем итоговое состояние загрузки (компонент + родитель)
const isLoading = computed(() => tableLoading.value || props.loading)

// Ключ для принудительного обновления таблицы
const tableKey = ref(0)

// Пагинация
const page = ref(1)
const perPage = ref(5) // 5 элементов на страницу

// Вычисляем общее количество страниц
const pageCount = computed(() => {
  return Math.ceil(props.products.length / perPage.value)
})

// Видимые номера страниц (для пагинации)
const visiblePageNumbers = computed(() => {
  const delta = 1 // Показывать +/- delta страниц от текущей
  const pages = []
  
  // Всегда показываем первую страницу
  if (pageCount.value > 0) {
    pages.push(1)
  }
  
  // Средние страницы
  const minPage = Math.max(2, page.value - delta)
  const maxPage = Math.min(pageCount.value - 1, page.value + delta)
  
  // Добавляем разделитель, если нужно
  if (minPage > 2) {
    pages.push('...')
  }
  
  // Добавляем средние страницы
  for (let i = minPage; i <= maxPage; i++) {
    pages.push(i)
  }
  
  // Добавляем разделитель, если нужно
  if (maxPage < pageCount.value - 1) {
    pages.push('...')
  }
  
  // Всегда показываем последнюю страницу, если она не совпадает с первой
  if (pageCount.value > 1) {
    pages.push(pageCount.value)
  }
  
  return pages
})

// Вычисляем элементы для текущей страницы
const paginatedProducts = computed(() => {
  const start = (page.value - 1) * perPage.value
  const end = start + perPage.value
  return props.products.slice(start, end)
})

// Переход на указанную страницу
async function goToPage(newPage: number) {
  // Проверяем валидность страницы
  if (newPage < 1 || newPage > pageCount.value || newPage === page.value) {
    return
  }
  
  // Обновляем номер страницы
  page.value = newPage
  
  // Устанавливаем состояние загрузки
  tableLoading.value = true
  
  // Обновляем ключ для принудительного перерендеринга
  tableKey.value++
  
  // Даем возможность отработать реактивности
  await nextTick()
  
  // Сбрасываем состояние загрузки через небольшую задержку
  setTimeout(() => {
    tableLoading.value = false
  }, 100)
}

// Принудительное обновление компонента
async function forceRefresh(newPage: number) {
  goToPage(newPage)
}

// Форматирование цены и даты (для отображения в будущем)
function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0
  }).format(price)
}

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr)
    return date.toLocaleString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch (e) {
    return dateStr
  }
}

// Отслеживаем изменение количества продуктов
watch(() => props.products.length, (newLength) => {
  // Сбрасываем на первую страницу, если текущая страница больше максимально возможной
  if (newLength > 0 && page.value > Math.ceil(newLength / perPage.value)) {
    page.value = 1
  }
})

// Инициализация компонента
onMounted(() => {
  // Инициализируем ключ таблицы
  tableKey.value = 0
})
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/mixins' as *;

.products-table-wrapper {
  width: 100%;
}
</style>
