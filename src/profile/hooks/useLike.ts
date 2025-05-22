import { useEffect, useState } from "react";
import { ReviewId, UserId } from "../../core/types";
import { getReviewLikeByUser, toggleReviewLike } from "../services/likes";

interface UseLikeProps {
    userId: UserId;
    reviewId: ReviewId;
}

export function useLike({ userId, reviewId }: UseLikeProps) {
    const [isLiked, setIsLiked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    // Comprobar si el usuario ya ha dado like a la reseña
    useEffect(() => {
        const checkIfLiked = async () => {
            if (userId === "" || reviewId === "") {
                setError("No se ha proporcionado el ID del usuario o del review")
                return
            }

            setIsLoading(true)

            try {
                const liked = await getReviewLikeByUser({userId, reviewId})
                setIsLiked(liked.liked)
            } catch (err) {
                setError(err instanceof Error ? err.message : String(err))
            } finally {
                setIsLoading(false)
            }
        }

        checkIfLiked()
    }, [userId, reviewId])

    const handleLike = async () => {
        try {
            setIsLoading(true)

            if (!userId || !reviewId) {
                setError("User ID or Review ID is missing")
                return
            }

            const liked = await toggleReviewLike({userId, reviewId})
            setIsLiked(liked.liked)

        } catch (err) {
            setError(err instanceof Error ? err.message : String(err))
        } finally {
            setIsLoading(false)
        }
    }

    return { isLiked, isLoading, error, handleLike }
}
