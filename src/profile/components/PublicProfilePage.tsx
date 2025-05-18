import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router"
import { usePublicUserProfileData } from "../hooks/usePublicUserProfileData"
import { useAuthStore } from "../../core/store/authStore"
import { useIsFollowing } from "../hooks/useIsFollowing"
import { followUser, unfollowUser } from "../services/followService"
import { useEffect } from "react"
import { SkeletonPublicProfile } from "./SkeletonPublicProfile"
import { ReviewsList } from "./ReviewsList"

export function PublicProfilePage() {
    const currentAuthUser = useAuthStore((state) => state.user) // Usuario autenticado
    const userId = useParams<{ userId?: string }>().userId?.trim() || "" // ID del usuario a mostrar
    const { isFollowing, setIsFollowing, isLoadingIsFollowing } = useIsFollowing({ followerId: currentAuthUser?.id || "", followingId: userId || "" })
    const { name, surname, aboutme, profileimage, posts, followers, following, error, isLoading } = usePublicUserProfileData({ userId })
    const navigate = useNavigate()

    // Comprobar si se esta accediendo al perfil propio
    useEffect(() => {
        if (userId && currentAuthUser?.id === userId) {
            navigate('/profile') // o la ruta a la que quieras redirigir
        }
    }, [userId, currentAuthUser?.id, navigate])


    if (isLoading || isLoadingIsFollowing) return <SkeletonPublicProfile />

    if (error) navigate('/')

    const handleFollow = async () => {
        if (isFollowing) {
            const res = await unfollowUser({ followerId: currentAuthUser?.id || "", followingId: userId || "" })

            if (res.error) {
                toast.error('Error al realizar la acción');
                return
            }

            setIsFollowing(false)
        } else {
            const res = await followUser({ followerId: currentAuthUser?.id || "", followingId: userId || "" })

            if (res.error) {
                toast.error('Error al realizar la acción');
                return
            }

            setIsFollowing(true)
        }
    }

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 flex items-center justify-center flex-col gap-10 p-4">
            <section className="w-full max-w-2xl flex flex-col justify-center items-center bg-white dark:bg-neutral-600 rounded-2xl p-6 md:p-10 gap-4 shadow-md border border-gray-200 dark:border-neutral-700">
                <img
                    src={`${profileimage?.trim() ? profileimage : "../placeholder_img_profile.png"}?t=${Date.now()}`}
                    alt="Imagen de perfil"
                    className="w-32 h-32 rounded-full object-cover"
                />
                <h1 className="text-xl sm:text-2xl font-semibold">{name} {surname}</h1>
                <div className="text-md flex justify-center text-center flex-col md:flex-row gap-4 md:gap-10">
                    <p><span className="font-bold">{posts}</span> Publicaciones</p>
                    <p><span className="font-bold">{followers}</span> Seguidores</p>
                    <p><span className="font-bold">{following}</span> Siguiendo</p>
                </div>
                <div className="w-full md:my-8">
                    <p className="text-">{aboutme}</p>
                </div>
                <button
                    type="button"
                    onClick={handleFollow}
                    className={`w-full max-w-40 py-3 rounded-lg shadow-sm text-white transition-all duration-300 font-semibold flex justify-center
                                ${isFollowing
                            ? 'bg-red-600 hover:bg-red-700'
                            : 'bg-green-600 hover:bg-green-700'}
                            `}
                >
                    {isFollowing ? 'Dejar de seguir' : 'Seguir'}
                </button>
            </section>
            <section className="w-full md:px-10">
                <ReviewsList userId={userId} />
            </section>
        </div>
    )
}
