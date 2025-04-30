import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '../types'
import { supabase } from '../supabase/supabaseClient'

interface AuthState {
    user: User | null
    isAuthenticated: boolean
    setUser: (user: AuthState['user']) => void
    logout: () => void
}

export const useAuthStore = create<AuthState>()(persist((set) => {
    return {
        user: null,
        isAuthenticated: false,
        setUser: (user) => {
            set({ user, isAuthenticated: !!user })
        },
        logout: async () => {
            await supabase.auth.signOut()
            set({ user: null, isAuthenticated: false })
        }
    }
}, {
    name: 'auth-storage'
}))
