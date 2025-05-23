import { useNavigate } from "react-router";
import { Review } from "../../core/types";
import { StarRating } from "../../core/components/StarRating";
import { useEffect, useRef } from "react";
import { HeartIcon } from "../../core/icons/HeartIcon";
import { useAuthStore } from "../../core/store/authStore";
import { useLike } from "../hooks/useLike";
import toast from "react-hot-toast";
import { useComments } from "../hooks/useComment";

interface UserReviewModalProps {
    review: Review;
    isOpen: boolean;
    onClose: () => void;
}

export function UserReviewModal({ review, isOpen, onClose }: UserReviewModalProps) {
    const currentAuthUser = useAuthStore((state) => state.user) // Usuario autenticado
    const { isLiked, handleLike, error: errorLike } = useLike({ userId: currentAuthUser?.id ?? "", reviewId: review.id })
    const { comments, newComment, isFetching, error: errorInsertComment, handleCommentChange, handleSubmitComment } = useComments({ reviewId: review.id, userId: currentAuthUser?.id ?? "" })
    const navigate = useNavigate()
    const modalRef = useRef<HTMLDivElement>(null)

    // Controlar el scroll del body al abrir la modal
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        return () => {
            // Limpieza por si el componente se desmonta
            document.body.classList.remove('overflow-hidden');
        };
    }, [isOpen])

    // Salir de la modal al hacer clic fuera de ella
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose])

    if (!isOpen) return null

    const handleBookRedirect = () => {
        if (!review.book_id) return
        navigate(`/search/book/${review.book_id}`);
    }

    if (errorLike) {
        toast.error('Error al actualizar el like')
    }

    if(errorInsertComment){
        toast.error('Error al registrar el comentario')
    }

    return (
        <div className={`mt-12 fixed inset-0 backdrop-brightness-35 backdrop-blur-xs flex items-center justify-center z-50 px-2 overflow-y-auto ${!isOpen ? 'hidden' : ''}`}>
            <div ref={modalRef} className="w-full max-w-3xl max-h-9/10 overflow-y-auto flex flex-col gap-4 p-4 md:p-6 bg-white dark:bg-neutral-600 rounded-2xl shadow-md border border-gray-200 dark:border-neutral-700">

                <div className="w-full flex justify-start gap-4">
                    <div onClick={handleBookRedirect} className={`w-14 md:w-20 aspect-[3/4] overflow-hidden border-neutral-300 dark:border-neutral-500 ${review.book_id ? 'cursor-pointer' : 'cursor-defaul'}`}>
                        <img
                            src={review.imageurl || 'placeholder_img_book.webp'}
                            alt="Book cover"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col">
                        <p onClick={handleBookRedirect} className={`text-lg font-semibold text-neutral-900 dark:text-neutral-50 ${review.book_id ? 'cursor-pointer' : 'cursor-defaul'}`}>{review.title}</p>
                        <p onClick={handleBookRedirect} className={`text-md text-neutral-700 dark:text-neutral-300 italic ${review.book_id ? 'cursor-pointer' : 'cursor-defaul'}`}>{review.author}</p>
                    </div>
                    {currentAuthUser?.id !== review.user_id
                        ?
                        <div onClick={handleLike} className="ml-auto flex items-start justify-center gap-2 cursor-pointer">
                            <HeartIcon className={`ml-auto w-7 h-7 transition-colors duration-300 ease-in-out ${isLiked ? "text-red-500" : "text-neutral-400 dark:text-neutral-500"}`} filled={true} />
                            <p className="text-lg text-neutral-700 dark:text-neutral-300 font-semibold">{review.likes}</p>
                        </div>
                        :
                        <div className="ml-auto flex items-start justify-center gap-2">
                            <HeartIcon className="w-7 h-7 text-neutral-700 dark:text-neutral-300" />
                            <p className="text-lg text-neutral-700 dark:text-neutral-300 font-semibold">{review.likes}</p>
                        </div>
                    }
                </div>

                <div className="w-full flex justify-start items-center text-center gap-2">
                    <p className="text-md text-neutral-700 dark:text-neutral-300">Calificación: </p>
                    <StarRating initialRating={review.rating} disabled={true} className="w-5 h-5" />
                </div>

                <p className="text-md h-full overflow-y-auto text-neutral-900 dark:text-neutral-50 overflow-hidden break-words">
                    {review.text}
                </p>

                <div className="w-full flex flex-col gap-4">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-neutral-300 dark:border-neutral-500" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-white dark:bg-neutral-600 px-3 text-md font-medium">
                                Comentarios
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col divide-y divide-neutral-300 dark:divide-neutral-500 max-h-30 md:max-h-50 overflow-y-auto p-1 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
                        {isFetching ? (
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">Cargando comentarios...</p>
                        ) : comments.length === 0 ? (
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">Aún no hay comentarios.</p>
                        ) : (
                            comments.map((comment, index) => (
                                <div
                                    key={index}
                                    className="py-3 px-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                                >
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-neutral-700 dark:text-neutral-300 font-semibold">USERNAME</p>
                                        <span className="text-xs text-neutral-700 dark:text-neutral-300">
                                            {comment.updated_at}
                                        </span>
                                    </div>
                                    <p className="text-sm text-neutral-900 dark:text-neutral-50 mt-1">{comment.text}</p>
                                </div>
                            ))
                        )}
                    </div>

                    {currentAuthUser?.id != review.user_id && (
                        <>
                            <form onSubmit={(e) => { e.preventDefault(); handleSubmitComment() }} className="flex flex-col gap-2">
                                <textarea value={newComment} onChange={handleCommentChange} className="w-full px-4 py-3 rounded-lg min-h-10 sm:min-h-20 md:min-h-30 bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-50 placeholder-gray-400 dark:placeholder-neutral-400 focus:outline-none border border-neutral-300 dark:border-transparent" placeholder="Escribe un comentario..." />
                                <button onClick={handleSubmitComment} type="button" className="self-end px-4 py-1 rounded-md bg-green-600 dark:bg-green-700 text-white text-sm font-semibold hover:bg-green-700 dark:hover:bg-green-800 transition-colors">
                                    Enviar
                                </button>
                            </form>
                        </>
                    )}
                </div>

                <div className="mt-auto flex items-center justify-center">
                    <button onClick={onClose} type="button" className="px-4 py-2 rounded-lg bg-blue-600 text-white dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 font-semibold">
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    )
}
