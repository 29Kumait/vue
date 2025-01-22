import { defineStore } from 'pinia'
import type { User } from '@supabase/supabase-js'
import { ref, computed } from 'vue'
import { supabase } from '../supabase'

export const useUserStore = defineStore('user', () => {
    // --- State ---
    const user = ref<User | null>(null)

    // --- Getters ---
    // isAuthenticated is a computed value
    const isAuthenticated = computed(() => !!user.value)

    // --- Actions ---
    function initAuthPersistence() {
        supabase.auth.onAuthStateChange((_, session) => {
            user.value = session?.user || null
        })
    }

    async function fetchUserSession() {
        const { data } = await supabase.auth.getSession()
        user.value = data.session?.user || null
    }

    async function signIn(email: string, password: string) {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
    }

    async function signUp(email: string, password: string) {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
    }

    async function signOut() {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
    }

    // Return everything we want to expose from the store
    return {
        user,
        isAuthenticated,
        initAuthPersistence,
        fetchUserSession,
        signIn,
        signUp,
        signOut,
    }
})