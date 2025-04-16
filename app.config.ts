export default defineAppConfig({
  ui: {
    primary: 'green',
    gray: 'cool',
    button: {
      default: {
        color: 'primary',
        variant: 'solid'
      }
    },
    card: {
      base: 'overflow-hidden',
      background: 'bg-white dark:bg-gray-900',
      divide: 'divide-y divide-gray-200 dark:divide-gray-800',
      ring: 'ring-1 ring-gray-200 dark:ring-gray-800',
      rounded: 'rounded-lg',
      shadow: 'shadow-sm',
      body: {
        padding: 'p-4 sm:p-5'
      },
      header: {
        padding: 'p-4 sm:p-5',
        background: 'bg-white dark:bg-gray-900'
      },
      footer: {
        padding: 'p-4 sm:p-5',
        background: 'bg-white dark:bg-gray-900'
      }
    },
    alert: {
      default: {
        color: 'primary'
      }
    },
    input: {
      default: {
        color: 'primary'
      }
    },
    badge: {
      default: {
        color: 'primary'
      }
    },
    toast: {
      default: {
        position: 'bottom-left',
        duration: 2000,
        closeButton: {
          icon: 'i-heroicons-x-mark-20-solid'
        }
      },
      slots: {
        root: 'bg-white border-l-4 rounded-md'
      },
      variants: {
        color: {
          primary: { root: 'border-primary-500' },
          success: { root: 'border-green-500' },
          error: { root: 'border-red-500' },
          info: { root: 'border-blue-500' },
          warning: { root: 'border-yellow-500' }
        }
      }
    }
  }
}) 