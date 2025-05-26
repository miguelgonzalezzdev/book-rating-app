import { useEffect, useState } from "react";
import { ListOfComments, ReviewId, UserId } from "../../core/types";
import { addCommentToReview, getCommentsByReview } from "../services/comments";

interface UseCommentsProps {
    reviewId: ReviewId
    userId: UserId
}

export function useComments({ reviewId, userId }: UseCommentsProps) {
    const [comments, setComments] = useState<ListOfComments>([])
    const [newComment, setNewComment] = useState("")
    const [isFetching, setIsFetching] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")

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

    // Manejar el texto escrito en el textarea del comentario
    const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const comment = event.target.value
        if (!comment.trim()) return
        setNewComment(comment)
    }

    // Manejar el envío del comentario
    const handleSubmitComment = () => {
        if (!newComment.trim()) return
        addComment(newComment)
        setNewComment("")
    }

    return {
        comments,
        newComment,
        isFetching,
        isSubmitting,
        error,
        handleCommentChange,
        handleSubmitComment
    }
}
