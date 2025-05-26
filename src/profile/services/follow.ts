import { supabase } from "../../core/supabase/supabaseClient"

interface CheckIsFollowingProps {
    followerId: string // ID de la persona que sigue
    followingId: string // ID de la persona seguida
}

export async function checkIsFollowing({ followerId, followingId }: CheckIsFollowingProps) {
    if (!followerId || !followingId) {
        return { success: false, follow: false, message: "Error al realizar la acción", error: true }
    }

    const { data, error } = await supabase
        .from('follows')
        .select('follower_id')
        .eq('follower_id', followerId)
        .eq('following_id', followingId)
        .limit(1)

    if (error && error.code !== 'PGRST116') {
        return { success: false, follow: false, message: "Error al realizar la acción", error: true }
    }

    return { success: true, follow: Array.isArray(data) && data.length > 0, message: "", error: null }
}

interface FollowProps {
    followerId: string // ID de la persona que sigue
    followingId: string // ID de la persona seguida
}

export async function followUser({ followerId, followingId }: FollowProps) {
    if (!followerId || !followingId) {
        return { error: true, message: "Error al realizar la acción" }
    }

    const { error } = await supabase
        .from('follows')
        .insert({ follower_id: followerId, following_id: followingId })

    if (error) return { error: true, message: error.message || 'Error al seguir al usuario' }

    return { error: false }
}

interface UnfollowUserProos {
    followerId: string // ID de la persona que sigue
    followingId: string // ID de la persona seguida
}


export async function unfollowUser({ followerId, followingId }: UnfollowUserProos) {

    if (!followerId || !followingId) {
        return { error: true, message: "Error al realizar la acción" }
    }

    const { error } = await supabase
        .from('follows')
        .delete()
        .eq('follower_id', followerId)
        .eq('following_id', followingId)

    if (error) return { error: true, message: error.message || 'Error al dejar de seguir al usuario' }

    return { error: false }
}