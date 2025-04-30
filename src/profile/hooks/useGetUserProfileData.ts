import { useState, useEffect } from "react"
import { supabase } from "../../core/supabase/supabaseClient"
import { useAuthStore } from "../../core/store/authStore"

export const useGetUserProfileData = () => {
    const user = useAuthStore((state) => state.user)
    const [userId, setUserId] = useState("")
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [aboutme, setAboutme] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user?.id) {
                setError("Usuario no autenticado")
                return
            }

            try {
                // Obtener el estado del usuario
                setUserId(user.id)
                setEmail(user.email)

                // Obtener datos del user desde la tabla 'profiles'
                const { data, error: profileError } = await supabase
                    .from("profiles")
                    .select("name, surname, aboutme")
                    .eq("id", user.id)
                    .single()

                if (profileError) {
                    setError("No se pudo cargar el perfil")
                    return
                }

                setName(data.name || "")
                setSurname(data.surname || "")
                setAboutme(data.aboutme || "")
            } catch {
                setError("Ocurrió un error inesperado")
            }
        }

        fetchUserData()
    }, [user])

    return {
        userId,
        name,
        setName,
        surname,
        setSurname,
        email,
        setEmail,
        aboutme, 
        setAboutme,
        error,
        setError,
    }
}
