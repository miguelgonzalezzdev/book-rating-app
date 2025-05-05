import { supabase } from "../../core/supabase/supabaseClient"

interface GetUserProfileData {
    userId: string
}

export async function getUserProfileData ({ userId }: GetUserProfileData) {
    const { data, error } = await supabase
        .from("profiles")
        .select("name, surname, aboutme, profileimage, posts_count, followers_count, following_count")
        .eq("id", userId)
        .single()

    if (error) throw new Error("No se pudo cargar el perfil")

    return {
        name: data.name || "",
        surname: data.surname || "",
        aboutme: data.aboutme || "",
        profileimage: data.profileimage || "",
        posts: data.posts_count || 0,
        followers: data.followers_count || 0,
        following: data.following_count || 0,
    }
}
