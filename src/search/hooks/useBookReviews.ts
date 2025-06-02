import { useEffect, useState } from "react"
import { ListOfReviews, BookId } from "../../core/types"
import { getBookReviews } from "../services/reviews"

interface UseBookReviewsProps {
    bookId: BookId
}

export function useBookReviews({ bookId }: UseBookReviewsProps) {
    const [reviews, setReviews] = useState<ListOfReviews>()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchReviews = async () => {
            setIsLoading(true)
            try {
                const response = await getBookReviews({ bookId })
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
    }, [bookId])

    return { reviews, isLoading, error }
}
