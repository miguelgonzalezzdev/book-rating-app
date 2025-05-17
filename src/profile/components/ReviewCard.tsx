import { StarRating } from "../../core/components/StarRating";
import { Review } from "../../core/types";

export function ReviewCard({ review }: { review: Review }) {
    return (
        <div key={review.id} className="flex flex-col gap-4 p-4 md:p-6 bg-white dark:bg-neutral-600 rounded-2xl shadow-md border border-gray-200 dark:border-neutral-700 w-full h-full">
            <div className="w-full flex justify-start gap-4">
                <div className="w-14 md:w-20 aspect-[3/4] overflow-hidden cursor-pointer border-neutral-300 dark:border-neutral-500">
                    <img
                        src={review.imageurl || 'placeholder_img_book.png'}
                        alt="Book cover"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-col">
                    <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">{review.title}</p>
                    <p className="text-md text-neutral-700 dark:text-neutral-300 italic">{review.author}</p>
                </div>
            </div>
            <div className="w-full flex justify-start items-center text-center gap-2">
                <p className="text-md text-neutral-700 dark:text-neutral-300 italic">Calificación: </p>
                <StarRating initialRating={review.rating} disabled={true} className="w-5 h-5" />
            </div>
            <p className="text-sm text-neutral-900 dark:text-neutral-50 line-clamp-4">
                {review.text}
            </p>
        </div>
    )
}
