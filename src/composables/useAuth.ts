import { ref } from 'vue';
import { supabase } from '../supabase';
import { useRouter } from 'vue-router';
import { useNotificationStore } from '../stores/useNotificationStore';

export function useAuth() {
  const router = useRouter();
  const loading = ref(false);
  const errorMsg = ref('');
  const notificationStore = useNotificationStore();

  async function signUp(email: string, password: string) {
    loading.value = true;
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      notificationStore.addNotification('success', 'Account created successfully');
      router.push('/second');
    } catch (error) {
      errorMsg.value = (error as Error).message;
      notificationStore.addNotification('error', errorMsg.value);
    } finally {
      loading.value = false;
    }
  }

  async function signIn(email: string, password: string) {
    loading.value = true;
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      notificationStore.addNotification('success', 'Signed in successfully');
      router.push('/second');
    } catch (error) {
      errorMsg.value = (error as Error).message;
      notificationStore.addNotification('error', errorMsg.value);
    } finally {
      loading.value = false;
    }
  }

  async function signOut() {
    loading.value = true;
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      notificationStore.addNotification('success', 'Signed out successfully');
      router.push('/auth');
    } catch (error) {
      errorMsg.value = (error as Error).message;
      notificationStore.addNotification('error', errorMsg.value);
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    errorMsg,
    signIn,
    signUp,
    signOut,
  };
}