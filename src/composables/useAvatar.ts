import { ref, type Ref } from 'vue';
import { supabase } from '../supabase';
import { useNotificationStore } from '../stores/useNotificationStore';

export interface UseAvatarReturn {
  uploading: Ref<boolean>;
  imageUrl: Ref<string>;
  downloadImage: (filePath: string) => Promise<void>;
  uploadAvatar: (file: File) => Promise<string>;
}

export function useAvatar(): UseAvatarReturn {
  const uploading = ref<boolean>(false);
  const imageUrl = ref<string>('');
  const notificationStore = useNotificationStore();

  async function downloadImage(filePath: string): Promise<void> {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(filePath);
      if (error) throw error;
      imageUrl.value = URL.createObjectURL(data);
    } catch (err) {
      handleError(err);
    }
  }

  async function uploadAvatar(file: File): Promise<string> {
    try {
      uploading.value = true;
      const fileExt = file.name.split('.').pop();
      const filePath = `${Math.random()}.${fileExt}`;
      const { error } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);
      if (error) throw error;
      notificationStore.addNotification(
        'success',
        'Avatar uploaded successfully!',
        3000
      );
      return filePath;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      uploading.value = false;
    }
  }

  function handleError(err: unknown): void {
    const e = err as Error;
    console.error(e);
    notificationStore.addNotification('error', e.message, 5000);
  }

  return {
    uploading,
    imageUrl,
    downloadImage,
    uploadAvatar,
  };
}
