import { ReviewId, UserId } from "../../core/types"
import { useComments } from "../hooks/useComment"
import { Comment } from "./Comment"

interface CommentsListProps {
    reviewId: ReviewId
    userId: UserId
}

export function CommentsList({ reviewId, userId }: CommentsListProps) {
    const { comments,isFetching,handleDeleteComment } = useComments({ reviewId, userId })

    if (isFetching) return <p className="text-sm text-neutral-500 dark:text-neutral-400">Cargando comentarios...</p>

    if (!isFetching && comments.length === 0) return <p className="text-sm text-neutral-500 dark:text-neutral-400">Aún no hay comentarios.</p>

    return (
        <ul className="flex flex-col divide-y divide-neutral-300 dark:divide-neutral-500 max-h-30 md:max-h-50 overflow-y-auto p-1 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
            {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} handleDeleteComment={() => handleDeleteComment({ commentId: comment.id })} />
            ))}
        </ul>
    )
}
