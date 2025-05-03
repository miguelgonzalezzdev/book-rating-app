import { useNavigate, useParams } from "react-router"
import { usePublicUserProfileData } from "../hooks/usePublicUserProfileData"
import { Loader } from "../../core/components/Loader"
import { useAuthStore } from "../../core/store/authStore"

export function PublicProfilePage() {
    const authUser = useAuthStore((state) => state.user) // Usuario autenticado
    const userId = useParams<{ userId?: string }>().userId?.trim() || "" // ID del usuario a mostrar
    const { name, surname, aboutme, profileimage, error, isLoading } = usePublicUserProfileData({ userId })
    const navigate = useNavigate()

    // Comprobar si se esta accediendo al perfil propio
    if (authUser?.id === userId) navigate('/profile')

    if (isLoading) return <Loader />

    if (error) navigate('/')

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 flex items-center justify-center flex-col p-4">
            <section className="w-full max-w-2xl flex flex-col justify-center items-center bg-white dark:bg-neutral-600 rounded-2xl p-6 md:p-10 gap-6 shadow-md border border-gray-200 dark:border-neutral-700">
                <img
                    src={`${profileimage?.trim() ? profileimage : "../placeholder_img_profile.png"}?t=${Date.now()}`}
                    alt="Imagen de perfil"
                    className="w-32 h-32 rounded-full object-cover"
                />
                <h1 className="text-xl sm:text-2xl font-semibold">{name} {surname}</h1>
                <div className="text-md flex justify-center gap-10">
                    <p><span className="font-bold">0</span> Publicaciones</p>
                    <p><span className="font-bold">0</span> Seguidores</p>
                </div>
                <div className="w-full mt-4">
                    <p className="text-">{aboutme}</p>
                </div>
            </section>
        </div>
    )
}
