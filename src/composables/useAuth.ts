import { ref } from 'vue';
import { useUserStore } from '../stores/useUserStore';
import { useRouter } from 'vue-router';
import { useNotificationStore } from '../stores/useNotificationStore';

export function useAuth() {
  const userStore = useUserStore();
  const router = useRouter();
  const loading = ref(false);
  const errorMsg = ref('');
  const notificationStore = useNotificationStore();

  async function signUp(email: string, password: string) {
    loading.value = true;
    try {
      await userStore.signUp(email, password);
      notificationStore.addNotification('success', 'Account created successfully');
      router.push('/second');
    } catch (error) {
      errorMsg.value = (error as Error).message;
    } finally {
      loading.value = false;
    }
  }

  async function signIn(email: string, password: string) {
    loading.value = true;
    try {
      await userStore.signIn(email, password);
      notificationStore.addNotification('success', 'Signed in successfully');
      router.push('/second');
    } catch (error) {
      errorMsg.value = (error as Error).message;
    } finally {
      loading.value = false;
    }
  }

  async function signOut() {
    loading.value = true;
    try {
      await userStore.signOut();
      notificationStore.addNotification('success', 'Signed out successfully');
      router.push('/auth');
    } catch (error) {
      errorMsg.value = (error as Error).message;
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