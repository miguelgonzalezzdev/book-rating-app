import { supabase } from "../../core/supabase/supabaseClient"
import { Book } from "../../core/types"

interface SearchBooksProps {
    search: string
}

export async function getBooksForSelect({ search }: SearchBooksProps): Promise<Book[]> {
    if (search.trim() === '') return []

    const { data, error } = await supabase
        .from('books')
        .select('id, title, author, rating, imageurl')
        .or(`title.ilike.%${search}%,author.ilike.%${search}%`)
        .eq('validated', 1)
        .order('title', { ascending: true })

    if (error) {
        if (error) throw new Error(error.message)
    }

    return data.map(book => ({
        id: book.id,
        title: book.title,
        author: book.author,
        rating: book.rating,
        imageUrl: book.imageurl,
    })) ?? []
}

interface GetBookSelectedByIdProps {
    bookId: string
}

export async function getBookSelectedById({ bookId }: GetBookSelectedByIdProps) {
    if (!bookId || bookId == "") return { success: false, message: 'Sin ID del libro' }

    const { data, error } = await supabase
        .from('books')
        .select('id, title, author, imageurl')
        .eq('id', bookId)
        .eq('validated', 1)
        .single()

    if (!data || error) return { success: false, message: 'Error al obtener los datos del libros' }

    return {
        id: data.id || "",
        title: data.title || "",
        author: data.author || "",
        imageUrl: data.imageurl || "",
    }
}
