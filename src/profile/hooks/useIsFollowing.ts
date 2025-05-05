import { useEffect, useState } from "react";
import { useAuthStore } from "../../core/store/authStore";
import { checkIsFollowing } from "../services/followService";

interface UseIsFollowing {
    followerId: string; // ID de la persona que sigue
    followingId: string; // ID de la persona seguida
}

export function useIsFollowing({ followerId, followingId }: UseIsFollowing) {
    const user = useAuthStore((state) => state.user)
    const [isFollowing, setIsFollowing] = useState(false)

    useEffect(() => {
        if (!user?.id || !followerId || !followingId) return;
        
        const fetchData = async () => {
            try {
                const data = await checkIsFollowing({followerId,followingId})
                setIsFollowing(data)
            } catch {
                setIsFollowing(false)
            }
        }

        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { isFollowing, setIsFollowing }
}
