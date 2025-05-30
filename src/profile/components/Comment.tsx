import { useNavigate } from "react-router";
import type { Comment, CommentId, UserId } from "../../core/types";
import { useAuthStore } from "../../core/store/authStore";
import { DeleteIcon } from "../../core/icons/DeleteIcon";

interface CommentProps {
    comment: Comment
    handleDeleteComment: (params: { commentId: CommentId }) => void
}

export function Comment({ comment, handleDeleteComment }: CommentProps) {
    const currentAuthUser = useAuthStore((state) => state.user)
    const navigate = useNavigate()

    const handleClick = ({ userId }: { userId: UserId }) => {
        navigate(`/profile/${userId}`) // Navegar al perfil de comentario
    }

    return (
        <li key={comment.id} className="py-3 px-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
            <div className="flex items-center justify-between">
                <p onClick={() => handleClick({ userId: comment.user_id })} className="text-sm text-neutral-700 dark:text-neutral-300 font-semibold cursor-pointer">{comment.username}</p>
                <span className="text-xs text-neutral-700 dark:text-neutral-300">
                    {comment.updated_at}
                </span>
                {comment.user_id === currentAuthUser?.id && (
                    <button onClick={() => handleDeleteComment({ commentId: comment.id })} className="text-red-700 dark:text-red-400 hover:scale-110 transition-transform">
                        <DeleteIcon />
                    </button>
                )}
            </div>
            <p className="text-sm text-neutral-900 dark:text-neutral-50 mt-1">{comment.text}</p>
        </li>
    )
}
