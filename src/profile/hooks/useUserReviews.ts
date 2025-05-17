import { useEffect, useState } from "react"
import { ListOfReviews, UserId } from "../../core/types"
import { getUserReviews } from "../services/userReviews"

export function useUserReviews({ userId }: { userId: UserId }) {
    const [reviews, setReviews] = useState<ListOfReviews>()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchReviews = async () => {
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

    return { reviews, isLoading, error }
}
