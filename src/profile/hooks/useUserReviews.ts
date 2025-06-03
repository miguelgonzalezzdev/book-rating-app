import { useEffect, useState } from "react"
import { ListOfReviews, ReviewId, UserId } from "../../core/types"
import { deleteUserReview, getUserReviews } from "../services/reviews"

interface UseUserReviewsProps {
    userId: UserId
}

export function useUserReviews({ userId }: UseUserReviewsProps) {
    const [reviews, setReviews] = useState<ListOfReviews>()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchReviews = async () => {
            setIsLoading(true)
            try {
                const response = await getUserReviews({ userId })
                if (response.success) {
                    setReviews(response.data)
                } else {
                    setError(response.error || 'Error fetching reviews')
                }
            } catch {
                setError('Error al obtener las reviews')
            } finally {
                setIsLoading(false)
            }
        }

        fetchReviews()
    }, [userId])

    const deleteReview = async ({ reviewId }: { reviewId: ReviewId }) => {
        if (!reviewId) {
            setError("Error al realizar la acción")
            return
        }

        setIsLoading(true)

        try {

            const data = await deleteUserReview({ reviewId, userId });

            if (!data.success) {
                setError("Error al eliminar la reseña. Inténtalo más tarde.")
                return
            }

            setReviews(reviews => reviews?.filter(review => review.id !== reviewId))

        } catch (err) {
            setError(err instanceof Error ? err.message : String(err))
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteReview = ({ reviewId }: { reviewId: ReviewId }) => {
        if (!reviewId) return

        deleteReview({ reviewId })
    }

    return { reviews, handleDeleteReview, isLoading, error }
}
