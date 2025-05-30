import { ReviewId, UserId } from "../../core/types"
import { useComments } from "../hooks/useComment"
import { Comment } from "./Comment"
import toast from "react-hot-toast";

interface CommentsListProps {
    reviewId: ReviewId
    userId: UserId
    reviewAuthorId: UserId
}

export function CommentsList({ reviewId, userId, reviewAuthorId }: CommentsListProps) {
    const { comments, newComment, isFetching, error: errorInsertComment, handleCommentChange, handleSubmitComment, handleDeleteComment } = useComments({ reviewId, userId })

    if (isFetching) return <p className="text-sm text-neutral-500 dark:text-neutral-400">Cargando comentarios...</p>

    if (!isFetching && comments.length === 0) return <p className="text-sm text-neutral-500 dark:text-neutral-400">Aún no hay comentarios.</p>

    if (errorInsertComment) {
        toast.error('Error al registrar el comentario')
    }

    return (
        <>
            <ul className="flex flex-col divide-y divide-neutral-300 dark:divide-neutral-500 max-h-30 md:max-h-50 overflow-y-auto p-1 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
                {comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} handleDeleteComment={() => handleDeleteComment({ commentId: comment.id })} />
                ))}
            </ul>

            {userId != reviewAuthorId && (
                <form onSubmit={(e) => { e.preventDefault(); handleSubmitComment() }} className="flex flex-col gap-2">
                    <textarea value={newComment} onChange={handleCommentChange} className="w-full px-4 py-3 rounded-lg min-h-10 sm:min-h-20 md:min-h-30 bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-50 placeholder-gray-400 dark:placeholder-neutral-400 focus:outline-none border border-neutral-300 dark:border-transparent" placeholder="Escribe un comentario..." />
                    <button onClick={handleSubmitComment} type="button" className="self-end px-4 py-1 rounded-md bg-green-600 dark:bg-green-700 text-white text-sm font-semibold hover:bg-green-700 dark:hover:bg-green-800 transition-colors">
                        Enviar
                    </button>
                </form>
            )}
        </>
    )
}
