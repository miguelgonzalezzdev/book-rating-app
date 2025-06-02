import { Alert } from "../../core/components/Alert";
import { BookId } from "../../core/types";
import { useBookReviews } from "../hooks/useBookReviews";
import { BookReviewCard } from "./BookReviewCard";
import { SkeletonReviewCard } from "./SkeletonReviewCard";

interface BookReviewsListProps {
    bookId: BookId
} 

export function BookReviewsList({ bookId }: BookReviewsListProps) {
    const { reviews, isLoading, error } = useBookReviews({ bookId })

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {Array.from({ length: 3 }).map((_, index) => (
                    <SkeletonReviewCard key={index} />
                ))}
            </div>
        )
    }

    if (error) {
        return (
            <Alert
                type="error"
                title="Error"
                message="Hubo un error al cargar las reseñas. Inténtelo de nuevo más tarde."
            />
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {reviews?.map(review => (
                <BookReviewCard key={review.id} review={review} />
            ))}
        </div>
    )
}
