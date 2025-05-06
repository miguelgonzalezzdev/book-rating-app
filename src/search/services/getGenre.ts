import { supabase } from "../../core/supabase/supabaseClient"

interface GetGenreProps {
    genreId: number
}

export async function getGenre ({ genreId }: GetGenreProps) {
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