import { useState, useEffect } from "react"
import { useAuthStore } from "../../core/store/authStore"
import { getUserProfileData, updateUserProfile, uploadUserProfileImage } from "../services/profileData"
import toast from "react-hot-toast"

export function useUserProfileData() {
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

    const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const newName = event.target.value
        setName(newName)
    }

    const handleSurname = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const newSurname = event.target.value
        setSurname(newSurname)
    }

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const newEmail = event.target.value
        setEmail(newEmail)
    }

    const handleAboutme = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        event.preventDefault()
        const aboutme = event.target.value
        setAboutme(aboutme)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')

        const res = await updateUserProfile({ id: userId, name, surname, email, aboutme })

        if (!res.success) {
            setError(res.message || 'Ocurrió un error inesperado')
            return
        }

        toast.success('Perfil actualizado correctamente')
    }

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        const res = await uploadUserProfileImage({ userId, file })

        if (!res.success) {
            setError(res.message || 'Ocurrió un error inesperado')
            return
        }

        setProfileimage(res.imageUrl || "")
        toast.success('Imagen actualizada correctamente')
    }

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
        isLoading, setIsLoading,
        handleName,
        handleSurname,
        handleEmail,
        handleAboutme,
        handleSubmit,
        handleImageChange,
    }
}
