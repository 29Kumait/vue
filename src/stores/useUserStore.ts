import { defineStore } from 'pinia';
import type { User } from '@supabase/supabase-js';
import { ref, computed } from 'vue';
import { supabase } from '../supabase';
import { useNotificationStore } from './useNotificationStore';

export const useUserStore = defineStore('user', () => {
  // State
  const user = ref<User | null>(null);
  const isLoading = ref(false);

  // Getters
  const isAuthenticated = computed(() => !!user.value);

  // Actions
  async function fetchUserSession() {
    isLoading.value = true;
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      user.value = data.session?.user || null;
    } catch (error) {
      handleAuthError(error, 'Failed to fetch user session');
    } finally {
      isLoading.value = false;
    }
  }

  async function signIn(email: string, password: string) {
    isLoading.value = true;
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      user.value = await fetchUserSession(); // Refresh the user state after login
      useNotificationStore().addNotification('success', 'Signed in successfully');
    } catch (error) {
      handleAuthError(error, 'Failed to sign in');
    } finally {
      isLoading.value = false;
    }
  }

  async function signUp(email: string, password: string) {
    isLoading.value = true;
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      useNotificationStore().addNotification('success', 'Account created successfully');
    } catch (error) {
      handleAuthError(error, 'Failed to sign up');
    } finally {
      isLoading.value = false;
    }
  }

  async function signOut() {
    isLoading.value = true;
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      user.value = null;
      useNotificationStore().addNotification('success', 'Signed out successfully');
    } catch (error) {
      handleAuthError(error, 'Failed to sign out');
    } finally {
      isLoading.value = false;
    }
  }

  function handleAuthError(error: unknown, fallbackMessage: string) {
    const message = (error as Error)?.message || fallbackMessage;
    console.error(message);
    useNotificationStore().addNotification('error', message);
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    fetchUserSession,
    signIn,
    signUp,
    signOut,
  };
});