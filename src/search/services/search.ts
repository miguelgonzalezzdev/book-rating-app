import { supabase } from "../../core/supabase/supabaseClient"
import { BookId, ListOfBooks, UserId } from "../../core/types";

interface RegisterBookSearchProps {
    userId: UserId;
    bookId: BookId;
}

export async function registerBookSearch({ userId, bookId }: RegisterBookSearchProps) {
    const { error } = await supabase
        .from('search_history')
        .upsert(
            [{
                user_id: userId,
                book_id: bookId,
                searched_at: new Date().toISOString()
            }],
            {
                onConflict: 'user_id,book_id',
                ignoreDuplicates: false
            }
        );

    if (error) {
        throw new Error("No se pudo registrar la búsqueda.");
    }
}

// Tipo especifico para el formato que devuelve supabase (array de objetos)
type BookFromSupabase = {
    book: {
        id: BookId;
        title: string;
        author: string;
        rating: number;
        imageurl: string;
    }
}

export async function getSearchHistory(userId: string): Promise<ListOfBooks> {
    const { data, error } = await supabase
        .from('search_history')
        .select(`book:book_id (id, title, author, rating, imageurl)`)
        .eq('user_id', userId)
        .order('searched_at', { ascending: false })
        .limit(10)
        .returns<BookFromSupabase[]>()

    if (error) {
        throw new Error(error.message)
    }

    if (!data) {
        throw new Error("No se han podido obtener datos.")
    }

    return data.map(entry => ({
        id: entry.book.id || "",
        title: entry.book.title || "",
        author: entry.book.author || "",
        rating: entry.book.rating || 0,
        imageUrl: entry.book.imageurl || "",
    }))
}
