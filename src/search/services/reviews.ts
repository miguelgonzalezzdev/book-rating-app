import { supabase } from "../../core/supabase/supabaseClient"
import { BookId, ListOfReviews } from "../../core/types";

interface GetBookReviewsProps{
    bookId: BookId
}

export async function getBookReviews({ bookId }: GetBookReviewsProps){

    if (!bookId) {
        return { success: false, error: "Usuario no autenticado" }
    }

    // Consultar reviews del libro
    const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("book_id", bookId)
        .order("updated_at", { ascending: false })

    if (error) {
        return { success: false, error: error.message }
    }

    return { success: true, data: data as ListOfReviews }
}
