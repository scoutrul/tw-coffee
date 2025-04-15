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
    toast: {
      default: {
        position: 'bottom-left',
        duration: 30000,
        class: 'custom-toast',
        closeButton: {
          icon: 'i-heroicons-x-mark-20-solid',
          color: 'gray',
          variant: 'link',
          padded: true
        }
      }
    }
  }
}) 