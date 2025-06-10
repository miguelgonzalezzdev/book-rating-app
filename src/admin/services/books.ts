import { supabase } from "../../core/supabase/supabaseClient";

export async function getAllBooks() {
    const { data, error } = await supabase
        .from('books')
        .select(`
            id,
            title,
            author,
            year,
            isbn,
            publisher,
            description,
            genre1:genreid1 (
                name
            ),
            genre2:genreid2 (
                name
            ),
            genre3:genreid3 (
                name
            ),
            imageurl,
            bookurl,
            rating,
            page_count
        `)
        .eq('validated', 1) // obtener solo los validados

    if (error) return { success: false, data: null, error: error }

    console.log(data)

    const books = data.map(book => ({
        id: book.id,
        title: book.title || "",
        author: book.author || "",
        year: book.year || 0,
        isbn: book.isbn || "",
        publisher: book.publisher || "",
        description: book.description || "",
        genre1: (book.genre1 as { name?: string })?.name || "",
        genre2: (book.genre2 as { name?: string })?.name || "",
        genre3: (book.genre3 as { name?: string })?.name || "",
        imageUrl: book.imageurl || "",
        bookUrl: book.bookurl || "",
        rating: book.rating || 0,
        pageCount: book.page_count || 0
    })).flat()

    return { success: true, data: books }
}
