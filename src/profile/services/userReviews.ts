import { supabase } from "../../core/supabase/supabaseClient"
import { ListOfReviews, UserId } from "../../core/types";

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
