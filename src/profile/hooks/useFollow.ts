import { useEffect, useState } from "react"
import { useAuthStore } from "../../core/store/authStore"
import { checkIsFollowing, followUser, unfollowUser } from "../services/follow"

interface UseFollowProps {
    followerId: string // ID de la persona que sigue
    followingId: string // ID de la persona seguida
}

export function useFollow({ followerId, followingId }: UseFollowProps) {
    const currentUser = useAuthStore((state) => state.user)
    const [isFollowing, setIsFollowing] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        if (!currentUser?.id || !followerId || !followingId) return

        const fetchData = async () => {
            setLoading(true)
            try {
                const data = await checkIsFollowing({ followerId, followingId })

                if (data.error) {
                    setError("Error al comprobar el seguimiento")
                    return
                }

                setIsFollowing(data.follow)
            } catch {
                setIsFollowing(false)
                setError("Error al comprobar el seguimiento")
            } finally {
                setLoading(false)
            }
        }

        fetchData();
    }, [currentUser?.id, followerId, followingId])

    // Funcion para manejar si se sigue o se deja de seguir a un usuario
    const handleToggleFollow = async () => {
        if (!currentUser?.id) return

        setLoading(true)

        try {
            const res = isFollowing
                ? await unfollowUser({ followerId: currentUser.id, followingId })
                : await followUser({ followerId: currentUser.id, followingId })

            if (res.error) {
                setError("Error al realizar la acción")
                return
            }

            setIsFollowing((prev) => !prev)
        } catch {
            setError("Error al realizar la acción")
        } finally {
            setLoading(false)
        }
    }

    return {
        isFollowing,
        handleToggleFollow,
        isLoading,
        error,
    }
}
