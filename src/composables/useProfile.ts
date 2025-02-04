import { ref, type Ref } from 'vue'
import { supabase } from '../supabase'
import type { User } from '@supabase/supabase-js'
import { useNotificationStore } from '../stores/useNotificationStore'

// Define an interface to explicitly type the composable's return
export interface UseProfileReturn {
  loading: Ref<boolean>
  errorMsg: Ref<string>
  username: Ref<string>
  avatarUrl: Ref<string>
  getProfile: (user: User | null) => Promise<void>
  updateProfile: (user: User | null, newUsername: string, newAvatarUrl: string) => Promise<void>
}

export function useProfile(): UseProfileReturn {
  const notificationStore = useNotificationStore()

  const loading = ref(false)
  const errorMsg = ref('')
  const username = ref('')
  const avatarUrl = ref('')

  // GET profile
  async function getProfile(user: User | null): Promise<void> {
    try {
      if (!user) throw new Error('Not logged in!')
      loading.value = true
      errorMsg.value = ''

      // Fetch the profile from Supabase
      const { data, error, status } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('user_id', user.id)
        .single()

      if (error && status !== 406) throw error

      if (!data) {
        // Insert a new row if it doesn’t exist
        const { error: insertError } = await supabase.from('profiles').insert({
          user_id: user.id,
          username: user.email,
          avatar_url: null,
          updated_at: new Date(),
        })
        if (insertError) throw insertError
        notificationStore.addNotification('success', 'Profile created successfully!', 3000)
        username.value = user.email || ''
        avatarUrl.value = ''
      } else {
        // If it exists, update local state
        username.value = data.username || user.email
        avatarUrl.value = data.avatar_url || ''
      }
    } catch (err) {
      const e = err as Error
      errorMsg.value = e.message
      notificationStore.addNotification('error', e.message, 5000)
    } finally {
      loading.value = false
    }
  }

  // UPDATE profile
  async function updateProfile(user: User | null, newUsername: string, newAvatarUrl: string): Promise<void> {
    try {
      if (!user) throw new Error('Not logged in!')
      loading.value = true
      errorMsg.value = ''

      const updates = {
        user_id: user.id,
        username: newUsername,
        avatar_url: newAvatarUrl,
        updated_at: new Date(),
      }

      const { error } = await supabase
        .from('profiles')
        .upsert(updates, { onConflict: 'user_id' })

      if (error) throw error
      notificationStore.addNotification('success', 'Profile updated successfully!', 3000)

      // Update local state with the new values
      username.value = newUsername
      avatarUrl.value = newAvatarUrl
    } catch (err) {
      const e = err as Error
      errorMsg.value = e.message
      notificationStore.addNotification('error', e.message, 5000)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    errorMsg,
    username,
    avatarUrl,
    getProfile,
    updateProfile,
  }
}
