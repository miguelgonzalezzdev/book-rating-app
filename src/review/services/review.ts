import { supabase } from "../../core/supabase/supabaseClient"
import { BookId, UserId } from "../../core/types"
import imageCompression from 'browser-image-compression'

interface InsertReviewData {
    user_id: UserId
    title: string
    author: string
    rating: number
    text: string
    imageurl: string
    book_id?: string
}

interface RegisterReviewForNewBookProps {
    bookId?: BookId
    bookName: string
    authorName: string
    rating: number
    reviewText: string
    imageFile: File | null
}

export async function registerReviewForNewBook({ bookId = "", bookName, authorName, rating, reviewText, imageFile }: RegisterReviewForNewBookProps) {

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

    const compressOptions = {
        maxSizeMB: 1, // tamaño máximo en MB
        maxWidthOrHeight: 1920, // redimensionar si es necesario
        useWebWorker: true,
        fileType: 'image/webp',
    }

    const compressedFile = await imageCompression(imageFile, compressOptions)
    const fileName = `${crypto.randomUUID()}.webp`

    const { error: uploadError } = await supabase.storage
        .from('review-images')
        .upload(fileName, compressedFile, { upsert: true })

    if (uploadError) {
        return { success: false, message: 'Error al subir la imagen', error: uploadError }
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
        title: bookName,
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
    const { data: insertedReviews, error: insertError } = await supabase
        .from('reviews')
        .insert(insertData)
        .select('id')
        .single();

    if (insertError) {
        return { success: false, message: 'Error guardar la reseña', error: insertError }
    }

    const newReviewId = insertedReviews.id;

    // Registrar la accion realizado en el historico
    const { error: historicError } = await supabase
        .from('historic')
        .insert({
            user_id: uuid_UserId,
            action_type_id: 1, // 1 = tipo review
            target_id: newReviewId,
            review_id: newReviewId
        });

    if (historicError) {
        return { success: false, message: 'Error al registrar la acción', error: historicError };
    }

    return { success: true }
}

interface RegisterReviewForExistingBookProps {
    bookId?: BookId
    bookName: string
    authorName: string
    rating: number
    reviewText: string
    imageUrl: string
}

export async function registerReviewForExistingBook({ bookId, bookName, authorName, rating, reviewText, imageUrl = "" }: RegisterReviewForExistingBookProps) {
    // Validar que los campos no esten vacios
    if (!bookId || !bookName || !authorName || !rating || !reviewText) {
        return { success: false, message: 'Todos los campos son obligatorios' }
    }

    // Obtener el id del usuario autenticado
    const { data } = await supabase.auth.getUser();
    const uuid_UserId = data?.user?.id;

    if (!uuid_UserId) {
        return { success: false, message: 'Usuario no autenticado' }
    }

    // Preparar los datos del insert
    const insertData: InsertReviewData = {
        book_id: bookId,
        user_id: uuid_UserId,
        title: bookName,
        author: authorName,
        rating,
        text: reviewText,
        imageurl: imageUrl
    }

    // Insertar la review
    const { data: insertedReviews, error: insertError } = await supabase
        .from('reviews')
        .insert(insertData)
        .select('id')
        .single();

    if (insertError) {
        return { success: false, message: 'Error guardar la reseña', error: insertError }
    }

    const newReviewId = insertedReviews.id;

    // Registrar la accion realizado en el historico
    const { error: historicError } = await supabase
        .from('historic')
        .insert({
            user_id: uuid_UserId,
            action_type_id: 1, // 1 = tipo review
            target_id: newReviewId,
            review_id: newReviewId
        });

    if (historicError) {
        return { success: false, message: 'Error al registrar la acción', error: historicError };
    }

    return { success: true }
}
