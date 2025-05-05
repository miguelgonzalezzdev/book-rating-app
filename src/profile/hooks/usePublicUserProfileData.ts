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
    const [posts, setPosts] = useState(0)
    const [followers, setFollowers] = useState(0)
    const [following, setFollowing] = useState(0)
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
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

        const fetchData = async () => {
            try {

                const profile = await getUserProfileData({userId})

                setName(profile.name)
                setSurname(profile.surname)
                setAboutme(profile.aboutme)
                setProfileimage(profile.profileimage)
                setPosts(profile.posts)
                setFollowers(profile.followers)
                setFollowing(profile.following)
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
        posts, setPosts,
        followers, setFollowers,
        following, setFollowing,
        error, setError,
        isLoading, setIsLoading
    }
}
