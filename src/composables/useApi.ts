import { ref } from 'vue';
import { DefaultApi, Configuration } from '../api';

const apiConfig = new Configuration({
  basePath: import.meta.env.VITE_API_URL,
});

const apiClient = new DefaultApi(apiConfig);

export function useApi() {
  const loading = ref(false);
  const error = ref<Error | null>(null);

  async function signUp(email: string, password: string) {
    loading.value = true;
    try {
      const response = await apiClient.authSignupPost({ email, password });
      return response.data;
    } catch (err) {
      error.value = err as Error;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function signIn(email: string, password: string) {
    loading.value = true;
    try {
      const response = await apiClient.authSigninPost({ email, password });
      return response.data;
    } catch (err) {
      error.value = err as Error;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function signOut() {
    loading.value = true;
    try {
      const response = await apiClient.authSignoutPost();
      return response.data;
    } catch (err) {
      error.value = err as Error;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function getProfile() {
    loading.value = true;
    try {
      const response = await apiClient.profileGet();
      return response.data;
    } catch (err) {
      error.value = err as Error;
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
      error.value = err as Error;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    error,
    signUp,
    signIn,
    signOut,
    getProfile,
    updateProfile,
  };
}
