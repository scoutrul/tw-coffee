<template>
  <SharedAccountDashboard 
    :user="user" 
    :show-nav-button="true" 
    @logout="handleLogout" 
  />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

// Страница аккаунта с защищенным доступом
const { user, logout } = useAuth()
const router = useRouter()

function handleLogout() {
  logout()
  router.push('/login')
}
</script> 