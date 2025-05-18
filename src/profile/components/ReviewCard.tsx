import { StarRating } from "../../core/components/StarRating";
import { Review } from "../../core/types";
import { useNavigate } from "react-router";

export function ReviewCard({ review }: { review: Review }) {
    const navigate = useNavigate();

    const handleClick = () => {
        if(!review.book_id) return
        navigate(`/search/book/${review.book_id}`);
    }

    return (
        <div key={review.id} className="flex flex-col gap-4 p-4 md:p-6 bg-white dark:bg-neutral-600 rounded-2xl shadow-md border border-gray-200 dark:border-neutral-700 w-full h-full">
            <div className="w-full flex justify-start gap-4">
                <div onClick={handleClick} className={`w-14 md:w-20 aspect-[3/4] overflow-hidden border-neutral-300 dark:border-neutral-500 ${review.book_id ? 'cursor-pointer' : 'cursor-defaul'}`}>
                    <img
                        src={review.imageurl || 'placeholder_img_book.png'}
                        alt="Book cover"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-col">
                    <p onClick={handleClick} className={`text-lg font-semibold text-neutral-900 dark:text-neutral-50 ${review.book_id ? 'cursor-pointer' : 'cursor-defaul'}`}>{review.title}</p>
                    <p onClick={handleClick} className={`text-md text-neutral-700 dark:text-neutral-300 italic ${review.book_id ? 'cursor-pointer' : 'cursor-defaul'}`}>{review.author}</p>
                </div>
            </div>
            <div className="w-full flex justify-start items-center text-center gap-2">
                <p className="text-md text-neutral-700 dark:text-neutral-300">Calificación: </p>
                <StarRating initialRating={review.rating} disabled={true} className="w-5 h-5" />
            </div>
            <p className="text-md text-neutral-900 dark:text-neutral-50 line-clamp-4">
                {review.text}
            </p>
            <p onClick={handleClick} className={`text-md text-neutral-700 dark:text-neutral-300 italic ${review.book_id ? 'cursor-pointer' : 'cursor-default'}`}>{review.book_id ? "Libro disponible en Biblioclase" : "Libro no disponible en Biblioclase"}</p>
        </div>
    )
}
