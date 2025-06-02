import { useEffect, useState } from "react";
import { ReviewId, UserId } from "../../core/types";
import { getReviewLikeByUser, getReviewTotalLikes, toggleReviewLike } from "../services/likes";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../core/store/authStore";

interface UseLikeProps {
    userId: UserId;
    reviewId: ReviewId;
}

export function useLike({ userId, reviewId }: UseLikeProps) {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
    const [totalLikes, setTotalLikes] = useState(0)
    const [isLiked, setIsLiked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    // Comprobar si el usuario ya ha dado like a la reseña
    useEffect(() => {
        const checkIfLiked = async () => {
            if (!isAuthenticated) return

            if (userId === "" || reviewId === "") {
                setError("No se ha proporcionado el ID del usuario o del review")
                return
            }

            setIsLoading(true)

            try {
                const liked = await getReviewLikeByUser({ userId, reviewId })
                setIsLiked(liked.liked)

                const total = await getReviewTotalLikes({ reviewId })
                setTotalLikes(total.count ?? 0)

                if (liked.error || total.error) {
                    setError("Se ha producido un error.")
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : String(err))
            } finally {
                setIsLoading(false)
            }
        }

        checkIfLiked()
    }, [userId, reviewId, isAuthenticated])

    const handleLike = async () => {
        if (!isAuthenticated) {
            navigate('/login')
            return
        }

        try {
            setIsLoading(true)

            if (!userId || !reviewId) {
                setError("User ID or Review ID is missing")
                return
            }

            const liked = await toggleReviewLike({ userId, reviewId })
            setIsLiked(liked.liked)
            setTotalLikes(prev => liked.liked === true ? prev + 1 : Math.max(prev - 1, 0))
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err))
        } finally {
            setIsLoading(false)
        }
    }

    return { totalLikes, isLiked, isLoading, error, handleLike }
}
