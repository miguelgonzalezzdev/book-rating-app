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

    // Obtener el id del usuario autenticado
    const { data } = await supabase.auth.getUser();
    const uuid_UserId = data?.user?.id;

    if (!uuid_UserId) {
        return { success: false, message: 'Usuario no autenticado' }
    }

    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
        .from('review-images')
        .upload(fileName, imageFile, { upsert: true });

    if (uploadError) {
        return { success: false, message: 'Error al subir la imagen', error: uploadError };
    }

    // Obtener URL publica de la imagen subida
    const { data: publicUrlData } = supabase.storage
        .from('review-images')
        .getPublicUrl(fileName)

    if (!publicUrlData || !publicUrlData.publicUrl) {
        return { success: false, message: 'Error al obtener la URL de la imagen' }
    }

    const imageUrl = publicUrlData.publicUrl

    // Preparar los datos del insert
    const insertData: InsertReviewData = {
        user_id: uuid_UserId,
        tittle: bookName,
        author: authorName,
        rating,
        text: reviewText,
        imageurl: imageUrl
    }

    // Anadir el bookId si existe
    if (bookId) {
        insertData.book_id = bookId;
    }

    // Insertar la review
    const { error: insertError } = await supabase
        .from('reviews')
        .insert(insertData);

    if (insertError) {
        return { success: false, message: 'Error guardar la reseña', error: insertError }
    }

    return { success: true }
}
