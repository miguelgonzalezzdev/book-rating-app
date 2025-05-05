import { supabase } from "../../core/supabase/supabaseClient";

export async function getAllGenres() {
    const { data, error } = await supabase.from('genres').select('*');
    if (error) throw error;
    return data;
}
