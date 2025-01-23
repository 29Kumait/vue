import { ref } from 'vue'
import { supabase } from '../supabase'

export function useAvatar() {
    const uploading = ref(false)
    const imageUrl = ref('')

    async function downloadImage(filePath: string) {
        try {
            const { data, error } = await supabase.storage.from('avatars').download(filePath)
            if (error) throw error
            imageUrl.value = URL.createObjectURL(data)
        } catch (err) {
            console.error('Error downloading image:', err)
        }
    }

    async function uploadAvatar(file: File) {
        try {
            uploading.value = true
            const fileExt = file.name.split('.').pop()
            const filePath = `${Math.random()}.${fileExt}`
            const { error } = await supabase.storage.from('avatars').upload(filePath, file)
            if (error) throw error
            return filePath
        } finally {
            uploading.value = false
        }
    }

    return {
        uploading,
        imageUrl,
        downloadImage,
        uploadAvatar
    }
}
