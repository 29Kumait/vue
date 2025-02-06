// src/composables/useAuth.ts

import { ref, type Ref } from 'vue'
import { supabase } from '../supabase'
import { useRouter } from 'vue-router'
import { useNotificationStore } from '../stores/useNotificationStore'

export interface UseAuthReturn {
  loading: Ref<boolean>
  errorMsg: Ref<string>
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

export function useAuth(): UseAuthReturn {
  const router = useRouter()
  const loading = ref<boolean>(false)
  const errorMsg = ref<string>('')
  const notificationStore = useNotificationStore()

  const signUp = async (email: string, password: string): Promise<void> => {
    try {
      loading.value = true
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) throw error
      notificationStore.addNotification(
        'success',
        'Account is created successfully!',
        3000
      )
      router.push('/second')
    } catch (err) {
      errorMsg.value = (err as Error).message
      handleError(err)
    } finally {
      loading.value = false
    }
  }

  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      loading.value = true
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      notificationStore.addNotification('success', 'Login!', 3000)
      router.push('/second')
    } catch (err) {
      errorMsg.value = (err as Error).message
      handleError(err)
    } finally {
      loading.value = false
    }
  }

  const signOut = async (): Promise<void> => {
    try {
      loading.value = true
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.push('/auth')
      notificationStore.addNotification('success', 'Signed Out!', 3000)
    } catch (err) {
      errorMsg.value = (err as Error).message
      handleError(err)
    } finally {
      loading.value = false
    }
  }

  function handleError(err: unknown): void {
    const e = err as Error
    console.error(e)
    notificationStore.addNotification('error', e.message, 3000)
  }

  return {
    loading,
    errorMsg,
    signUp,
    signIn,
    signOut,
  }
}