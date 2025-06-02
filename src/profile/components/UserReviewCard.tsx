import { useState } from "react";
import { StarRating } from "../../core/components/StarRating";
import { Review } from "../../core/types";
import { useNavigate } from "react-router";
import { UserReviewModal } from "./UserReviewModal";
import { HeartIcon } from "../../core/icons/HeartIcon";
import { useAuthStore } from "../../core/store/authStore";
import { useLike } from "../hooks/useLike";
import toast from "react-hot-toast";

export function UserReviewCard({ review }: { review: Review }) {
    const currentAuthUser = useAuthStore((state) => state.user) // Usuario autenticado
    const navigate = useNavigate()
    const [showReviewModal, setReviewModal] = useState(false)
    const { totalLikes, isLiked, handleLike, error } = useLike({ userId: currentAuthUser?.id ?? "", reviewId: review.id }) 

    const handleClick = () => {
        if (!review.book_id) return
        navigate(`/search/book/${review.book_id}`);
    }

    const handleOpenReviewModal = () => {
        setReviewModal(true)
    }

    const handleCloseReviewModal = () => {
        setReviewModal(false)
    }

    if(error){
        toast.error('Error al actualizar el like')
    }

    return (
        <>
            <div className="flex flex-col gap-4 p-4 md:p-6 bg-white dark:bg-neutral-600 rounded-2xl shadow-md border border-gray-200 dark:border-neutral-700 w-full h-full">
                <div className="w-full flex justify-start gap-4">
                    <div onClick={handleClick} className={`w-14 md:w-20 aspect-[3/4] overflow-hidden border-neutral-300 dark:border-neutral-500 ${review.book_id ? 'cursor-pointer' : 'cursor-defaul'}`}>
                        <img
                            src={review.imageurl || 'placeholder_img_book.webp'}
                            alt="Book cover"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col">
                        <p onClick={handleClick} className={`text-lg font-semibold text-neutral-900 dark:text-neutral-50 ${review.book_id ? 'cursor-pointer' : 'cursor-defaul'}`}>{review.title}</p>
                        <p onClick={handleClick} className={`text-md text-neutral-700 dark:text-neutral-300 italic ${review.book_id ? 'cursor-pointer' : 'cursor-defaul'}`}>{review.author}</p>
                    </div>
                    {currentAuthUser?.id !== review.user_id
                        ?
                        <div onClick={handleLike} className="ml-auto flex items-start justify-center gap-2 cursor-pointer">
                            <HeartIcon className={`ml-auto w-7 h-7 transition-colors duration-300 ease-in-out ${isLiked ? "text-red-500" : "text-neutral-400 dark:text-neutral-500"}`} filled={true}/>
                            <p className="text-lg text-neutral-700 dark:text-neutral-300 font-semibold">{totalLikes}</p>
                        </div>
                        :
                        <div className="ml-auto flex items-start justify-center gap-2">
                            <HeartIcon className="w-7 h-7 text-neutral-700 dark:text-neutral-300" />
                            <p className="text-lg text-neutral-700 dark:text-neutral-300 font-semibold">{totalLikes}</p>
                        </div>
                    }
                </div>
                <div className="w-full flex justify-start items-center text-center gap-2">
                    <p className="text-md text-neutral-700 dark:text-neutral-300">Calificación: </p>
                    <StarRating initialRating={review.rating} disabled={true} className="w-5 h-5" />
                </div>
                <p className="text-md text-neutral-900 dark:text-neutral-50 overflow-hidden break-words line-clamp-3">
                    {review.text}
                </p>
                <p onClick={handleClick} className={`text-md text-neutral-700 dark:text-neutral-300 italic ${review.book_id ? 'cursor-pointer' : 'cursor-default'}`}>{review.book_id ? "Libro disponible en Biblioclase" : "Libro no disponible en Biblioclase"}</p>
                <div className="mt-auto flex items-center justify-center">
                    <button onClick={handleOpenReviewModal} type="button" className="px-4 py-2 rounded-lg bg-blue-600 text-white dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 font-semibold">
                        Ver reseña
                    </button>
                </div>
            </div>
            <UserReviewModal key={review.id} isOpen={showReviewModal} review={review} isLiked={isLiked} totalLikes={totalLikes} handleLike={handleLike} onClose={handleCloseReviewModal} />
        </>
    )
}
