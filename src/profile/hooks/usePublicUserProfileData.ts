import { useState, useEffect } from "react"
import { useAuthStore } from "../../core/store/authStore"
import { getUserProfileData } from "../services/getUserProfileData" 

interface UploadUserProfileImage {
    userId: string
}

export function usePublicUserProfileData ({userId}: UploadUserProfileImage) {
    const user = useAuthStore((state) => state.user)

    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [aboutme, setAboutme] = useState("")
    const [profileimage, setProfileimage] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            if (!user?.id) {
                setError("Usuario no autenticado")
                setIsLoading(false)
                return
            }

            if (!userId || userId === "") {
                setError("ID de usuario no proporcionado")
                setIsLoading(false)
                return
            }

            try {

                const profile = await getUserProfileData(userId)

                setName(profile.name)
                setSurname(profile.surname)
                setAboutme(profile.aboutme)
                setProfileimage(profile.profileimage)
            } catch {
                setError("Ocurrió un error inesperado")
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {
        name, setName,
        surname, setSurname,
        aboutme, setAboutme,
        profileimage, setProfileimage,
        error, setError,
        isLoading, setIsLoading
    }
}
