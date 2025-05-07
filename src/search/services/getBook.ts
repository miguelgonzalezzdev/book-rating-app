import { supabase } from "../../core/supabase/supabaseClient"
import { Book, BookDetails, BookId, GenreId } from "../../core/types"

interface GetBookProps {
    bookId: BookId
}

export async function getBook({ bookId }: GetBookProps): Promise<BookDetails> {
    const { data, error } = await supabase
        .from('books')
        .select('id, title, author, year, isbn, publisher, description, genreid1, genreid2, genreid3, imageurl, bookurl, rating')
        .eq('id', bookId)
        .single()

    if (error) throw new Error(error.message);

    if (!data) throw new Error("No se encontraron libros");

    return {
        id: data.id || 0,
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
    }
}

interface GetBooksByGenreProps {
    genreId: GenreId
}

export async function getBooksByGenre({ genreId }: GetBooksByGenreProps): Promise<Book[]> {
    const { data, error } = await supabase
        .from('books')
        .select('id, title, author, rating, imageurl')
        .or(`genreid1.eq.${genreId},genreid2.eq.${genreId},genreid3.eq.${genreId}`);

    if (error) throw new Error(error.message);

    return data.map(book => ({
        id: book.id,
        title: book.title,
        author: book.author,
        rating: book.rating,
        imageUrl: book.imageurl,
    }));
}
