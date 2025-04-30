import { useEffect } from "react"
import { supabase } from "../../core/supabase/supabaseClient" 
import { useAuthStore } from "../../core/store/authStore" 

export const useAuthListener = () => {
  const setUser = useAuthStore((state) => state.setUser)
  const logout = useAuthStore((state) => state.logout)

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user?.id && session?.user?.email) {
        setUser({ id: session.user.id, email: session.user.email })
      } else {
        logout()
      }
    })

    return () => {
        data.subscription.unsubscribe()
    }
  }, [setUser, logout])
}
