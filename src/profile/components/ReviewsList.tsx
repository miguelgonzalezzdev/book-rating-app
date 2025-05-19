import { Alert } from "../../core/components/Alert";
import { UserId } from "../../core/types";
import { useUserReviews } from "../hooks/useUserReviews";
import { ReviewCard } from "./ReviewCard";
import { SkeletonReviewCard } from "./SkeletonReviewCard";

export function ReviewsList({ userId }: { userId: UserId }) {
    const { reviews, isLoading, error } = useUserReviews({ userId })

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {Array.from({ length: 3 }).map((_, index) => (
                    <SkeletonReviewCard key={index} />
                ))}
            </div>
        );
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
                <ReviewCard key={review.id} review={review} />
            ))}
        </div>
    )
}
