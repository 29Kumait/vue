import { defineStore } from 'pinia'
import type { User } from '@supabase/supabase-js'
import { ref, computed } from 'vue'
import { supabase } from '../supabase'
import { useNotificationStore } from './useNotificationStore'
import type { AuthChangeEvent, Session } from '@supabase/supabase-js'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const isLoading = ref<boolean>(false)

  const isAuthenticated = computed(() => !!user.value)

  const notificationStore = useNotificationStore()

  function initAuthPersistence(): void {
    supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
      user.value = session?.user || null
    })
  }

  async function fetchUserSession(): Promise<User | null> {
    isLoading.value = true
    try {
      const { data, error } = await supabase.auth.getSession()
      if (error) throw error
      user.value = data.session?.user || null
      return user.value
    } catch (error) {
      handleAuthError(error, 'Failed to fetch user session')
      return null
    } finally {
      isLoading.value = false
    }
  }

  async function signIn(email: string, password: string): Promise<void> {
    isLoading.value = true
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error

      await fetchUserSession()
      notificationStore.addNotification('success', 'Signed in successfully')
    } catch (error) {
      handleAuthError(error, 'Failed to sign in')
    } finally {
      isLoading.value = false
    }
  }

  async function signUp(email: string, password: string): Promise<void> {
    isLoading.value = true
    try {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) throw error

      notificationStore.addNotification('success', 'Account created successfully')
    } catch (error) {
      handleAuthError(error, 'Failed to sign up')
    } finally {
      isLoading.value = false
    }
  }

  async function signOut(): Promise<void> {
    isLoading.value = true
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      user.value = null
      notificationStore.addNotification('success', 'Signed out successfully')
    } catch (error) {
      handleAuthError(error, 'Failed to sign out')
    } finally {
      isLoading.value = false
    }
  }

  function handleAuthError(error: unknown, fallbackMessage: string): void {
    const message = (error as Error)?.message || fallbackMessage
    console.error(message)
    notificationStore.addNotification('error', message)
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    initAuthPersistence,
    fetchUserSession,
    signIn,
    signUp,
    signOut,
  }
})
