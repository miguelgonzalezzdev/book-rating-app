import { useNavigate } from "react-router"
import { ListOfComments, UserId } from "../../core/types"

interface CommentsListProps {
    comments: ListOfComments
}

export function CommentsList({ comments }: CommentsListProps) {
    const navigate = useNavigate()

    const handleClick = ({ userId }: { userId: UserId }) => {
        navigate(`/profile/${userId}`) // Navegar al perfil del primer comentario
    }

    return (
        <div className="flex flex-col divide-y divide-neutral-300 dark:divide-neutral-500 max-h-30 md:max-h-50 overflow-y-auto p-1 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
            {comments.map((comment) => (
                <div key={comment.id} className="py-3 px-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                    <div className="flex items-center justify-between">
                        <p onClick={() => handleClick({ userId: comment.user_id })} className="text-sm text-neutral-700 dark:text-neutral-300 font-semibold cursor-pointer">{comment.username}</p>
                        <span className="text-xs text-neutral-700 dark:text-neutral-300">
                            {comment.updated_at}
                        </span>
                    </div>
                    <p className="text-sm text-neutral-900 dark:text-neutral-50 mt-1">{comment.text}</p>
                </div>
            ))}
        </div>
    )
}
