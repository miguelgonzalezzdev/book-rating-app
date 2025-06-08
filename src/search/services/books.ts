import { supabase } from "../../core/supabase/supabaseClient"
import { Book, BookId, GenreId } from "../../core/types"

interface GetBookProps {
    bookId: BookId
}

export async function getBook({ bookId }: GetBookProps) {
    if (!bookId || bookId == "") throw new Error("Error al obtener el id del libro")

    const { data, error } = await supabase
        .from('books')
        .select('id, title, author, year, isbn, publisher, description, genreid1, genreid2, genreid3, imageurl, bookurl, rating, page_count')
        .eq('id', bookId)
        .eq('validated', 1)
        .single()

    if (error) throw new Error(error.message)

    if (!data) throw new Error("No se encontraron libros")

    return {
        id: data.id || "",
        title: data.title || "",
        author: data.author || "",
        year: data.year || "",
        isbn: data.isbn || "",
        publisher: data.publisher || "",
        description: data.description || "",
        genreId1: data.genreid1 || 0,
        genreId2: data.genreid2 || 0,
        genreId3: data.genreid3 || 0,
        imageUrl: data.imageurl || "",
        bookUrl: data.bookurl || "",
        rating: data.rating || "",
        page_count: data.page_count || 0,
    }
}

interface GetBooksByGenreProps {
    genreId: GenreId
}

export async function getBooksByGenre({ genreId }: GetBooksByGenreProps): Promise<Book[]> {
    if (!genreId || genreId == 0) throw new Error("Error al obtener el id del género")

    const { data, error } = await supabase
        .from('books')
        .select('id, title, author, rating, imageurl')
        .or(`genreid1.eq.${genreId},genreid2.eq.${genreId},genreid3.eq.${genreId}`)
        .eq('validated', 1);

    if (error) throw new Error(error.message)

    return data.map(book => ({
        id: book.id,
        title: book.title,
        author: book.author,
        rating: book.rating,
        imageUrl: book.imageurl,
    }))
}

interface SearchBooksProps {
    search: string
}

export async function searchBooks({ search }: SearchBooksProps): Promise<Book[]> {
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
