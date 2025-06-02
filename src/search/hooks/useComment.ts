import { useEffect, useState } from "react";
import { CommentId, ListOfComments, ReviewId, UserId } from "../../core/types";
import { addCommentToReview, deleteCommentFromReview, getCommentsByReview } from "../services/comments";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../core/store/authStore";

interface UseCommentsProps {
    reviewId: ReviewId
    userId: UserId
}

export function useComments({ reviewId, userId }: UseCommentsProps) {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
    const [comments, setComments] = useState<ListOfComments>([])
    const [newComment, setNewComment] = useState("")
    const [isFetching, setIsFetching] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    // Obtener los comentarios de una reseña
    useEffect(() => {
        const fetchComments = async () => {
            if (!reviewId) {
                setError("Error al realizar la acción")
                return
            }

            setIsFetching(true)

            try {
                const data = await getCommentsByReview({ reviewId })

                if (!data.success) {
                    setError(data.error ?? "Error al obtener los comentarios")
                    return
                }

                setComments(data.data ?? [])
            } catch (err) {
                setError(err instanceof Error ? err.message : String(err))
            } finally {
                setIsFetching(false)
            }
        }

        fetchComments()
    }, [reviewId])

    // Registrar un nuevo comentario
    const addComment = async (text: string) => {
        if (!userId || !reviewId || !text.trim()) {
            setError("Error al realizar la acción")
            return
        }

        setIsSubmitting(true)

        try {
            const data = await addCommentToReview({ reviewId, userId, comment: newComment })

            if (!data.success) {
                setError(data.error ?? "Error al registrar el comentario")
                return
            }

            // Actualizar los comentarios con el nuevo comentario
            setComments(prev => [...prev, data.data])
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err))
        } finally {
            setIsSubmitting(false)
        }
    }

    const deleteComment = async ({ commentId }: { commentId: CommentId }) => {
        if (!userId || !reviewId || !commentId) {
            setError("Error al realizar la acción")
            return
        }

        setIsSubmitting(true)

        try {

            const data = await deleteCommentFromReview({ commentId, userId })

            if (!data.success) {
                setError(data.error ?? "Error al eliminar el comentario")
                return
            }

            setComments(comments => comments.filter(comment => comment.id !== commentId))

        } catch (err) {
            setError(err instanceof Error ? err.message : String(err))
        } finally {
            setIsSubmitting(false)
        }
    }

    // Manejar el texto escrito en el textarea del comentario
    const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const comment = event.target.value
        if (!comment.trim()) return
        setNewComment(comment)
    }

    // Manejar el envío del comentario
    const handleSubmitComment = () => {
        if (!isAuthenticated) {
            navigate('/login')
            return
        }

        if (!newComment.trim()) return
        
        addComment(newComment)
        setNewComment("")
    }

    // Manejar el borrado de un comentario
    const handleDeleteComment = ({ commentId }: { commentId: CommentId }) => {
        deleteComment({commentId})
    }

    return {
        comments,
        newComment,
        isFetching,
        isSubmitting,
        error,
        handleCommentChange,
        handleSubmitComment,
        handleDeleteComment
    }
}
