import { ListOfComments } from "../../core/types"
import { Comment } from "./Comment"

interface CommentsListProps {
    comments: ListOfComments
}

export function CommentsList({ comments }: CommentsListProps) {
    return (
        <div className="flex flex-col divide-y divide-neutral-300 dark:divide-neutral-500 max-h-30 md:max-h-50 overflow-y-auto p-1 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
            {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </div>
    )
}
