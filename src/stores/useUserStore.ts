import { defineStore } from 'pinia'
import type { User } from '@supabase/supabase-js'
import { supabase } from '../supabase'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as User | null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.user,
    },
    actions: {
        initAuthPersistence() {
            supabase.auth.onAuthStateChange((_, session) => {
                this.user = session?.user || null
            })
        },
        async fetchUserSession() {
            const { data } = await supabase.auth.getSession()
            this.user = data.session?.user || null
        },
        async signIn(email: string, password: string) {
            const { error } = await supabase.auth.signInWithPassword({ email, password })
            if (error) throw error
        },
        async signUp(email: string, password: string) {
            const { error } = await supabase.auth.signUp({ email, password })
            if (error) throw error
        },
        async signOut() {
            const { error } = await supabase.auth.signOut()
            if (error) throw error
        },
    },
})
