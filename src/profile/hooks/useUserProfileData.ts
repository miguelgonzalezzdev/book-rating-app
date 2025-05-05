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

        const fetchData = async () => { 
            try {
                // Sacar el id y email del estado global de usuario logueado
                setUserId(user.id)
                setEmail(user.email)

                const profile = await getUserProfileData({ userId: user.id })

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
        userId,
        name, setName,
        surname, setSurname,
        email, setEmail,
        aboutme, setAboutme,
        profileimage, setProfileimage,
        posts, setPosts,
        followers, setFollowers,
        following, setFollowing,
        error, setError,
        isLoading, setIsLoading
    }
}
