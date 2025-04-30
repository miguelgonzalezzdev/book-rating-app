import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '../types'
import { supabase } from '../supabase/supabaseClient'

interface AuthState {
    user: User | null
    isAuthenticated: boolean
    setUser: (user: User | null) => void
    clearAuth: () => void // ← solo limpia el estado
    logout: () => Promise<void> // ← logout completo con supabase
}

export const useAuthStore = create<AuthState>()(persist((set) => ({
    user: null,
    isAuthenticated: false,

    setUser: (user) => {
        set({ user, isAuthenticated: !!user })
    },

    clearAuth: () => {
        set({ user: null, isAuthenticated: false })
    },

    logout: async () => {
        await supabase.auth.signOut()
        set({ user: null, isAuthenticated: false })
    }
}), {
    name: 'auth-storage'
}))
