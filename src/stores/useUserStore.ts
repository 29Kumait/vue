import { defineStore } from 'pinia'
import type { User } from '@supabase/supabase-js'
import { ref, computed } from 'vue'
import { supabase } from '../supabase'
import { useNotificationStore } from './useNotificationStore'

export const useUserStore = defineStore('user', () => {
  // ---------------------------------------
  // State
  // ---------------------------------------
  const user = ref<User | null>(null)
  const isLoading = ref(false)

  // ---------------------------------------
  // Getters
  // ---------------------------------------
  const isAuthenticated = computed(() => !!user.value)

  // ---------------------------------------
  // Single instance of notification store
  // ---------------------------------------
  const notificationStore = useNotificationStore()

  // ---------------------------------------
  // Actions
  // ---------------------------------------

  // Listen to auth changes from Supabase
  function initAuthPersistence() {
    supabase.auth.onAuthStateChange((_, session) => {
      user.value = session?.user || null
    })
  }

  // Retrieve current user's session from Supabase
  async function fetchUserSession() {
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

  // Sign user in
  async function signIn(email: string, password: string) {
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

  // Register a new user
  async function signUp(email: string, password: string) {
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

  // Log user out
  async function signOut() {
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

  // ---------------------------------------
  // Helper: Centralized error handling
  // ---------------------------------------

  function handleAuthError(error: unknown, fallbackMessage: string) {
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
