import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '../types'
import { supabase } from '../supabase/supabaseClient'

interface AuthState {
    user: User | null
    isAuthenticated: boolean
    isAdmin: boolean
    setUser: (user: User | null) => void
    clearAuth: () => void
    logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isAdmin: false,

            setUser: (user) => {
                set({
                    user,
                    isAuthenticated: !!user,
                    isAdmin: user?.isAdmin ?? false,
                })
            },

            clearAuth: () => {
                set({
                    user: null,
                    isAuthenticated: false,
                    isAdmin: false,
                })
            },

            logout: async () => {
                await supabase.auth.signOut();
                set({
                    user: null,
                    isAuthenticated: false,
                    isAdmin: false,
                })
            },
        }),
        {
            name: 'auth-storage',
        }
    )
) 
