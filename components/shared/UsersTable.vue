<template>
  <div class="users-table-wrapper">
    <div class="table-controls mb-4">
      <UInput v-model="search" icon="i-heroicons-magnifying-glass" placeholder="Поиск пользователя" />
      
      <USelectMenu
        v-model="selectedStatus"
        :options="statusOptions"
        placeholder="Статус пользователя"
        option-attribute="text"
        value-attribute="value"
      />
    </div>
    
    <UTable 
      :columns="columns" 
      :rows="filteredRows"
      :loading="loading"
      :empty-state="{ icon: 'i-heroicons-user-circle', label: 'Пользователи не найдены' }"
    >
      <template #status-data="{ row }">
        <UBadge :color="getUser(row).active ? 'success' : 'error'" size="sm">
          {{ getUser(row).active ? 'Активен' : 'Неактивен' }}
        </UBadge>
      </template>
      
      <template #created-data="{ row }">
        {{ formatDate(getUser(row).created) }}
      </template>
      
      <template #actions-data="{ row }">
        <UButton 
          color="primary"
          variant="ghost"
          icon="i-heroicons-pencil-square" 
          size="xs"
          @click="editUser(getUser(row))"
        />
        
        <UButton 
          color="error"
          variant="ghost"
          icon="i-heroicons-trash" 
          size="xs"
          @click="deleteUser(getUser(row))"
        />
      </template>
    </UTable>
    
    <div class="table-footer mt-4">
      <UPagination v-model="page" :page-count="totalPages" :total="totalItems" />
      
      <div class="mt-4">
        <USelectMenu
          v-model="perPage"
          :options="perPageOptions"
          placeholder="Записей на странице"
          option-attribute="text"
          value-attribute="value"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { User } from '~/types/user'
import type { TableColumn } from '#ui/types'

// Вспомогательная функция для безопасного получения пользователя из row
function getUser(row: any): User {
  return row as User
}

// Состояние таблицы
const loading = ref(false)
const search = ref('')
const page = ref(1)
const perPage = ref(10)
const selectedStatus = ref('')

// Определение колонок таблицы
const columns = [
  {
    key: 'name',
    label: 'Имя',
    sortable: true
  },
  {
    key: 'credentials.username',
    label: 'Email',
    sortable: true
  },
  {
    key: 'status',
    label: 'Статус'
  },
  {
    key: 'created',
    label: 'Дата регистрации',
    sortable: true
  },
  {
    key: 'actions',
    label: 'Действия',
    align: 'center'
  }
] as unknown as TableColumn<User, keyof User>[]

// Опции для фильтров
const statusOptions = [
  { text: 'Все пользователи', value: '' },
  { text: 'Активные', value: 'active' },
  { text: 'Неактивные', value: 'inactive' }
]

const perPageOptions = [
  { text: '5 записей', value: 5 },
  { text: '10 записей', value: 10 },
  { text: '25 записей', value: 25 },
  { text: '50 записей', value: 50 }
]

// Имитация данных пользователей
const users = ref<User[]>([
  {
    name: 'David',
    surname: 'Jones',
    credentials: {
      username: 'david.jones@creds.com',
      passphrase: '52ccca432ab28afd90969084c061b23c'
    },
    active: true,
    created: '03.03.2025 10:00:21'
  },
  {
    name: 'Samantha',
    surname: 'Robertson',
    credentials: {
      username: 'sam.robertson@creds.com',
      passphrase: 'cefdd8f05b00320c8ff42f8734f96633'
    },
    active: true,
    created: '03.03.2025 10:28:13'
  },
  {
    name: 'Nicholas',
    surname: 'Crew',
    credentials: {
      username: 'nic.crew@creds.com',
      passphrase: '23c2b519b1e2cd4bbaf5f68f58024785'
    },
    active: false,
    created: '01.03.2025 12:56:28'
  },
  {
    name: 'Alisa',
    surname: 'Wood',
    credentials: {
      username: 'alisa.wood@creds.com',
      passphrase: '123456'
    },
    active: true,
    created: '05.03.2025 09:15:00'
  },
  {
    name: 'Michael',
    surname: 'Brown',
    credentials: {
      username: 'michael.brown@creds.com',
      passphrase: '123456'
    },
    active: false,
    created: '02.03.2025 15:40:12'
  }
])

// Фильтрация пользователей
const filteredUsers = computed(() => {
  let result = [...users.value]
  
  // Фильтр по поиску
  if (search.value) {
    const searchLower = search.value.toLowerCase()
    result = result.filter(user => 
      user.name.toLowerCase().includes(searchLower) || 
      user.surname.toLowerCase().includes(searchLower) ||
      user.credentials.username.toLowerCase().includes(searchLower)
    )
  }
  
  // Фильтр по статусу
  if (selectedStatus.value === 'active') {
    result = result.filter(user => user.active)
  } else if (selectedStatus.value === 'inactive') {
    result = result.filter(user => !user.active)
  }
  
  return result
})

// Пагинация
const totalItems = computed(() => filteredUsers.value.length)
const totalPages = computed(() => Math.ceil(totalItems.value / perPage.value))

const filteredRows = computed(() => {
  const start = (page.value - 1) * perPage.value
  const end = start + perPage.value
  return filteredUsers.value.slice(start, end)
})

// Форматирование даты
function formatDate(dateStr: string) {
  return dateStr // Можно добавить форматирование, если нужно
}

// Действия с пользователями
const toast = useCustomToast()

function editUser(user: User) {
  toast.add({
    title: 'Редактирование пользователя',
    description: `Редактирование ${user.name} ${user.surname}`,
    color: 'info',
    icon: 'i-heroicons-pencil-square'
  })
}

function deleteUser(user: User) {
  toast.add({
    title: 'Удаление пользователя',
    description: `Пользователь ${user.name} ${user.surname} удален`,
    color: 'error',
    icon: 'i-heroicons-trash'
  })
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/mixins' as *;

.users-table-wrapper {
  width: 100%;
}

.table-controls {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  
  @media (min-width: 640px) {
    flex-direction: row;
  }
}

.table-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style> 