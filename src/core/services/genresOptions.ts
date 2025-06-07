import { supabase } from "../supabase/supabaseClient"

export async function getGenresOptions() {
    const { data, error } = await supabase
        .from('genres')
        .select('id, name')
        .order('name', { ascending: true });

    if (!data || error) return { success: false, genres: [], error: 'Error al obtener los datos del libros' }

    return { success: true, genres: data }
}
