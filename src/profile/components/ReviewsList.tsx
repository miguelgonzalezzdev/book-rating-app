import { UserId } from "../../core/types";
import { useUserReviews } from "../hooks/useUserReviews";
import { ReviewCard } from "./ReviewCard";

export function ReviewsList({ userId }: { userId: UserId }) {
    const { reviews/*, isLoading, error*/ } = useUserReviews({ userId })

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {reviews?.map(review => (
                <ReviewCard key={review.id} review={review}/>
            ))}
        </div>
    )
}
