import { supabase } from "../../core/supabase/supabaseClient"

interface UseIsFollowing {
    followerId: string // ID de la persona que sigue
    followingId: string // ID de la persona seguida
}

export async function checkIsFollowing({ followerId, followingId }: UseIsFollowing) {
    if (!followerId || !followingId) throw new Error('Invalid followerId or followingId')

    const { data, error } = await supabase
        .from('follows')
        .select('follower_id')
        .eq('follower_id', followerId)
        .eq('following_id', followingId)
        .limit(1)

    if (error && error.code !== 'PGRST116') throw error
    console.log('checkIsFollowing', data)
    return Array.isArray(data) && data.length > 0
}

export async function followUser({ followerId, followingId }: UseIsFollowing) {
    try {
        if (!followerId || !followingId) throw new Error('Invalid followerId or followingId')

        const { error } = await supabase
            .from('follows')
            .insert({ follower_id: followerId, following_id: followingId })

        if (error) throw error

        return { error: false }
    } catch (err: unknown) {
        return {
            error: true,
            message: (err as Error)?.message || 'Error al dejar de seguir al usuario'
        }
    }
}

export async function unfollowUser({ followerId, followingId }: UseIsFollowing) {
    try {
        if (!followerId || !followingId) throw new Error('Invalid followerId or followingId')

        const { error } = await supabase
            .from('follows')
            .delete()
            .eq('follower_id', followerId)
            .eq('following_id', followingId)

        if (error) throw error

        return { error: false }
    } catch (err: unknown) {
        return {
            error: true,
            message: (err as Error)?.message || 'Error al dejar de seguir al usuario'
        }
    }
}