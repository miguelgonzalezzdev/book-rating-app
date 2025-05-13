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
