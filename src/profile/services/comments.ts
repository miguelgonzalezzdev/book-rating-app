import { supabase } from "../../core/supabase/supabaseClient";
import { ListOfComments, ReviewId, UserId } from "../../core/types";

interface GetCommentsByReviewProps {
    reviewId: ReviewId
}

export async function getCommentsByReview({ reviewId }: GetCommentsByReviewProps) {

    if (!reviewId) {
        return { success: false, error: "Usuario no autenticado" }
    }

    // Consultar los comentarios de la review
    const { data, error } = await supabase
        .from("review_comments")
        .select("*, username:profiles(name,surname)")
        .eq("review_id", reviewId)
        .order("updated_at", { ascending: false })

    if (error) {
        return { success: false, data: [], error: error.message }
    }

    if (!data) {
        return { success: true, data: [] }
    }

    // Mapear para añadir el campo username concatenado
    const commentsWithUsername = data.map(comment => ({
        ...comment,
        username: `${comment.username.name} ${comment.username.surname}`
    }))

    return { success: true, data: commentsWithUsername as ListOfComments }
}

interface AddCommentToReviewProps {
    reviewId: ReviewId
    userId: UserId
    comment: string
}

export async function addCommentToReview({ reviewId, userId, comment }: AddCommentToReviewProps) {
    if (!userId || !reviewId || !comment.trim()) {
        return { success: false, data: null, error: "Faltan datos requeridos" }
    }

    const { data, error: insertError } = await supabase
        .from("review_comments")
        .insert([{ user_id: userId, review_id: reviewId, text: comment }])
        .select("*, username:profiles(name,surname)")
        .single()
        
    if (insertError) {
        return { success: false, data: null, error: insertError.message }
    }

    const commentWithUsername = {
        ...data,
        username: `${data.username.name} ${data.username.surname}`
    }

    return { success: true, data: commentWithUsername, error: null }
}
