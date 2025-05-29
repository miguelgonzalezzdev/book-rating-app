import { useNavigate } from "react-router";
import type { Comment, UserId } from "../../core/types";

interface CommentProps {
    comment: Comment
}

export function Comment({ comment }: CommentProps) {
    const navigate = useNavigate()

    const handleClick = ({ userId }: { userId: UserId }) => {
        navigate(`/profile/${userId}`) // Navegar al perfil de comentario
    }

    return (
        <div key={comment.id} className="py-3 px-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
            <div className="flex items-center justify-between">
                <p onClick={() => handleClick({ userId: comment.user_id })} className="text-sm text-neutral-700 dark:text-neutral-300 font-semibold cursor-pointer">{comment.username}</p>
                <span className="text-xs text-neutral-700 dark:text-neutral-300">
                    {comment.updated_at}
                </span>
            </div>
            <p className="text-sm text-neutral-900 dark:text-neutral-50 mt-1">{comment.text}</p>
        </div>
    )
}
