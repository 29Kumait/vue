import { defineStore } from 'pinia'
import { supabase } from '../supabase'
import type { User } from '@supabase/supabase-js'

interface UserState {
    user: User | null
}

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        user: null
    }),

    getters: {
        isAuthenticated: (state) => !!state.user
    },

    actions: {
        async initAuthPersistence() {
            const { data } = await supabase.auth.getSession()
            this.user = data.session?.user ?? null

            supabase.auth.onAuthStateChange((_, session) => {
                this.user = session?.user ?? null
            })
        },

        async fetchUserSession() {
            const { data } = await supabase.auth.getSession()
            this.user = data.session?.user ?? null
        },

        async signIn(email: string, password: string) {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password
            })
            if (error) throw error
        },

        async signOut() {
            const { error } = await supabase.auth.signOut()
            if (error) throw error
            this.user = null
        }
    }
})