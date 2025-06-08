import { useEffect } from "react"
import { supabase } from "../../core/supabase/supabaseClient"
import { useAuthStore } from "../../core/store/authStore"

export const useAuthListener = () => {
  const setUser = useAuthStore((state) => state.setUser)
  const clearAuth = useAuthStore((state) => state.clearAuth)

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {

      const fetchProfileAndSetUser = async () => {
        if (session?.user?.id && session?.user?.email) {
          try {
            const { data: profile, error } = await supabase
              .from("profiles")
              .select("is_admin")
              .eq("id", session.user.id)
              .single()

            if (error) throw error

            const isAdmin = Number(profile?.is_admin) === 1

            setUser({
              id: session.user.id,
              email: session.user.email,
              isAdmin,
            })
          } catch {
            clearAuth()
          }
        } else {
          clearAuth()
        }
      }

      fetchProfileAndSetUser()
    })

    return () => {
      listener?.subscription?.unsubscribe()
    }
  }, [setUser, clearAuth])
}
