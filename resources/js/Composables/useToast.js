
import { ref } from 'vue'

export function useToast() {
  const isVisible = ref(false)
  const message = ref('')
  const title = ref('')
  const type = ref('success')

  const show = (newTitle, newMessage, newType = 'success') => {
    title.value = newTitle
    message.value = newMessage
    type.value = newType
    isVisible.value = true

    setTimeout(() => {
      isVisible.value = false
    }, 3000)
  }

  const success = (newTitle, newMessage) => show(newTitle, newMessage, 'success')
  const error = (newTitle, newMessage) => show(newTitle, newMessage, 'error')

  return {
    isVisible,
    message,
    title,
    type,
    show,
    success,
    error
  }
}
