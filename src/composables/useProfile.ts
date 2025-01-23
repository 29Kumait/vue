import { ref } from 'vue'
import { supabase } from '../supabase'
import type { User } from '@supabase/supabase-js'
import { useNotificationStore } from '../stores/useNotificationStore'


export function useProfile() {
    const notificationStore = useNotificationStore()

    const loading = ref(false)
    const errorMsg = ref('')
    const username = ref('')
    const avatarUrl = ref('')

    // GET profile
    async function getProfile(user: User | null) {
        try {
            if (!user) throw new Error('Not logged in!')
            loading.value = true
            errorMsg.value = ''

            // fetch the profile
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
                notificationStore.addNotification('success', 'Avatar uploaded!', 3000)
                username.value = user.email || ''
                avatarUrl.value = ''
            } else {
                // if it exists
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
    async function updateProfile(user: User | null, newUsername: string, newAvatarUrl: string) {
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

            // re-fetch or just trust the update
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
        updateProfile
    }
}
