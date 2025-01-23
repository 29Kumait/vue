import { ref } from 'vue'
import { supabase } from '../supabase'
import { useRouter } from 'vue-router'

export function useAuth() {
    const router = useRouter()
    const loading = ref(false)
    const errorMsg = ref('')

    const signUp = async (email: string, password: string) => {
        try {
            loading.value = true
            const { error } = await supabase.auth.signUp({ email, password })
            if (error) throw error
            router.push('/second')
        } catch (err) {
            errorMsg.value = (err as Error).message
        } finally {
            loading.value = false
        }
    }

    const signIn = async (email: string, password: string) => {
        try {
            loading.value = true
            const { error } = await supabase.auth.signInWithPassword({ email, password })
            if (error) throw error
            router.push('/second')
        } catch (err) {
            errorMsg.value = (err as Error).message
        } finally {
            loading.value = false
        }
    }

    const signOut = async () => {
        try {
            loading.value = true
            const { error } = await supabase.auth.signOut()
            if (error) throw error
            router.push('/auth')
        } catch (err) {
            errorMsg.value = (err as Error).message
        } finally {
            loading.value = false
        }
    }

    return {
        loading,
        errorMsg,
        signUp,
        signIn,
        signOut,
    }
}
