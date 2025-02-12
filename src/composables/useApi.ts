// src/composables/useApi.ts
import { ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import { useNotificationStore } from '../stores/useNotificationStore'
import { DefaultApi, Configuration } from '../api';

const apiConfig = new Configuration({
  basePath: import.meta.env.VITE_API_URLS,
})

const apiClient = new DefaultApi(apiConfig)

export interface UseApiReturn {
  loading: Ref<boolean>
  errorMsg: Ref<string>
  signUp: (email: string, password: string, username: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  getProfile: () => Promise<any>
  updateProfile: (username: string, avatarUrl: string) => Promise<any>
}

export function useApi(): UseApiReturn {
  const router = useRouter()
  const loading = ref<boolean>(false)
  const errorMsg = ref<string>('')
  const notificationStore = useNotificationStore()

  const handleAuthResponse = (response: any) => {
    if (response.token) {
      localStorage.setItem('authToken', response.token)
    }
  }

  const signUp = async (email: string, password: string, username: string): Promise<void> => {
    try {
      loading.value = true;
      const response = await apiClient.authSignupPost({ email, password, username });
      handleAuthResponse(response.data);
      notificationStore.addNotification('success', 'Account created successfully!', 3000);
      router.push('/second');
    } catch (err) {
      errorMsg.value = (err as Error).message;
      handleError(err);
    } finally {
      loading.value = false;
    }
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      loading.value = true
      const response = await apiClient.authSigninPost({ email, password })
      handleAuthResponse(response.data)
      notificationStore.addNotification('success', 'Login successful!', 3000)
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
      await apiClient.authSignoutPost()
      localStorage.removeItem('authToken')
      router.push('/auth')
      notificationStore.addNotification('success', 'Signed out successfully!', 3000)
    } catch (err) {
      errorMsg.value = (err as Error).message
      handleError(err)
    } finally {
      loading.value = false
    }
  }

  const handleError = (err: unknown): void => {
    const e = err as Error
    console.error(e)
    notificationStore.addNotification('error', e.message, 3000)
    // Clear auth token on 401 errors
    if (e.message.includes('401')) {
      localStorage.removeItem('authToken')
    }
  }

  async function getProfile() {
    loading.value = true;
    try {
      const response = await apiClient.profileGet();
      return response.data;
    } catch (err) {
      errorMsg.value = (err as Error).message
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updateProfile(username: string, avatarUrl: string) {
    loading.value = true;
    try {
      const response = await apiClient.profilePut({ username, avatarUrl });
      return response.data;
    } catch (err) {
      errorMsg.value = (err as Error).message
      throw err;
    } finally {
      loading.value = false;
    }
  }
  return {
    loading,
    errorMsg,
    signUp,
    signIn,
    signOut,
    getProfile,
    updateProfile,
  }
}

