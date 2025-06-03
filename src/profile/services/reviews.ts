import { supabase } from "../../core/supabase/supabaseClient"
import { ListOfReviews, ReviewId, UserId } from "../../core/types";

export async function getUserReviews({ userId }: { userId: UserId }): Promise<{ success: boolean; data?: ListOfReviews; error?: string }> {

    if (!userId) {
        return { success: false, error: "Usuario no autenticado" }
    }

    // Consultar reviews del usuario
    const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("user_id", userId)
        .order("updated_at", { ascending: false })

    if (error) {
        return { success: false, error: error.message }
    }

    return { success: true, data: data as ListOfReviews }
}

interface DeleteUserReviewProps {
    reviewId: ReviewId
    userId: UserId
}

export const deleteUserReview = async ({ reviewId, userId }: DeleteUserReviewProps) => {
    if (!reviewId || !userId) {
        return { success: false, error: "Error al realizar la acción" }
    }

    const { error } = await supabase
        .from("reviews")
        .delete()
        .eq("id", reviewId)
        .eq("user_id", userId)

    if (error) {
        return { success: false, error: error.message }
    }

    return { success: true }
}
