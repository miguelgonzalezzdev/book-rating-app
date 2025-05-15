import { supabase } from "../../core/supabase/supabaseClient"

interface RegisterInput {
    bookId?: string
    bookName: string
    authorName: string
    rating: number
    reviewText: string
    imageFile: File | null
}

interface InsertReviewData {
        user_id: string
        tittle: string
        author: string
        rating: number
        text: string
        imageurl: string
        book_id?: string
    }

export async function registerReview({ bookId = "", bookName, authorName, rating, reviewText, imageFile }: RegisterInput) {

    // Validar que los campos no esten vacios
    if (!bookName || !authorName || !rating || !reviewText || !imageFile) {
        return { success: false, message: 'Todos los campos son obligatorios' }
    }

    const { data } = await supabase.auth.getUser();
    const uuid_UserId = data?.user?.id;

    if (!uuid_UserId) {
        return { success: false, message: 'Usuario no autenticado' }
    }

    const insertData: InsertReviewData = {
        user_id: uuid_UserId,
        tittle: bookName,
        author: authorName,
        rating,
        text: reviewText,
        imageurl: ""
    }

    // Anadir el bookId si existe
    if (bookId) {
        insertData.book_id = bookId; 
    }

    const { error: insertError } = await supabase
        .from('reviews')
        .insert(insertData);

    if (insertError) {
        return { success: false, message: 'Error guardar la reseña', error: insertError }
    }

    return { success: true }
}
