import { supabase } from "../../core/supabase/supabaseClient"
import { GenreId } from "../../core/types"

interface GetGenreProps {
    genreId: GenreId
}

export async function getGenre ({ genreId }: GetGenreProps) {
    if(!genreId || genreId==0) throw new Error("Error al obtener el id del género")
    
    const { data, error } = await supabase
        .from("genres")
        .select("name, color")
        .eq("id", genreId)
        .single()

    if (!data || error) throw new Error("No se encontró el género")

    return {
        name: data.name || "",
        color: data.color || "",
    }
}

export async function getAllGenres() {
    const { data, error } = await supabase.from('genres')
        .select('*')
        .order('name', { ascending: true });
        
    if (error) throw error;
    return data;
}
