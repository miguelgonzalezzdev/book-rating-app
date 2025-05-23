import { supabase } from "../../core/supabase/supabaseClient"
import { ReviewId, UserId } from "../../core/types"

interface GetReviewLikeByUserProps {
    userId: UserId
    reviewId: ReviewId
}

export async function getReviewLikeByUser({userId, reviewId}: GetReviewLikeByUserProps) {
    const { data, error: checkError } = await supabase
        .from("review_likes")
        .select("id")
        .eq("user_id", userId)
        .eq("review_id", reviewId)
        .single()

    if (checkError && checkError.code !== "PGRST116") {
        return { success: false, liked: false, message: "Error registrar el like", error: checkError }
    }

    return { success: true, liked: !!data, message: "", error: null }
}

interface ToggleReviewLikeProps {
    userId: UserId
    reviewId: ReviewId
}

export async function toggleReviewLike({ userId, reviewId }: ToggleReviewLikeProps) {
    // Verificar si ya existe el like
    const { data: checkLike, error: checkError } = await supabase
        .from("review_likes")
        .select("id")
        .eq("user_id", userId)
        .eq("review_id", reviewId)
        .single()

    if (checkError && checkError.code !== "PGRST116") {
        return { success: false, liked: false, error: "Error comprobando el like" }
    }

    // Si existe el like, eliminarlo
    if (checkLike) {
        const { error: deleteError } = await supabase
            .from("review_likes")
            .delete()
            .eq("id", checkLike.id)

        if (deleteError) {
            return { success: false, liked: true, error: "Error al quitar el like" }
        }

        return { success: true, liked: false }
    }

    // Si no existe el like, insertarlo
    const { error: insertError } = await supabase
        .from("review_likes")
        .insert([{ user_id: userId, review_id: reviewId }])

    if (insertError) {
        return { success: false, liked: false, error: "Error al registrar el like" }
    }

    return { success: true, liked: true, error: null }
}
