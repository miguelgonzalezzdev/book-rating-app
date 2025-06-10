import { supabase } from "../../core/supabase/supabaseClient";

export async function getAllUsers() {
    const { data, error } = await supabase
        .from('profiles')
        .select('id, name, surname, aboutme, profileimage, followers_count, following_count, posts_count')
        .eq('is_admin', 0) // no obtener los admins

    if (error) return { success: false, data: null, error: error}

    const users = data.map(user => ({
        id: user.id,
        email: "",
        name: user.name || "",
        surname: user.surname || "",
        about: user.aboutme || "",
        image: user.profileimage || "",
        followersCount: user.followers_count || 0, 
        followingCount: user.following_count || 0,
        postsCount: user.posts_count || 0,
        isAdmin: false
    }))

    return { success: true, data: users}
}
