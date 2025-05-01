import { useState, useEffect } from "react"
import { useAuthStore } from "../../core/store/authStore"
import { getUserProfileData } from "../services/getUserProfileData" 

export function useUserProfileData () {
    const user = useAuthStore((state) => state.user)

    const [userId, setUserId] = useState("")
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [aboutme, setAboutme] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            if (!user?.id) {
                setError("Usuario no autenticado")
                setIsLoading(false)
                return
            }

            setIsLoading(true)

            try {
                setUserId(user.id)
                setEmail(user.email)

                const profile = await getUserProfileData(user.id)

                setName(profile.name)
                setSurname(profile.surname)
                setAboutme(profile.aboutme)
            } catch {
                setError("Ocurrió un error inesperado")
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [user])

    return {
        userId,
        name, setName,
        surname, setSurname,
        email, setEmail,
        aboutme, setAboutme,
        error, setError,
        isLoading, setIsLoading
    }
}
