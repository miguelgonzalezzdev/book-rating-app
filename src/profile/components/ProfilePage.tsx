import { FormInputField } from "../../core/components/FormInputField";
import { updateUserProfile, uploadUserProfileImage } from "../services/updateUserProfile";
import { useUserProfileData } from "../hooks/useUserProfileData";
import { toast } from 'react-hot-toast';
import { Loader } from "../../core/components/Loader";
import { EditIcon } from "../../core/icons/EditIcon";
import { FormButton } from "../../core/components/FormButton";
import { FormLabel } from "../../core/components/FormLabel";
import { useState } from "react";
import { ConfirmModal } from "../../core/components/ConfirmModal";
import { useAuthStore } from "../../core/store/authStore";

export function ProfilePage() {
    const { userId, name, setName, surname, setSurname, email, setEmail, aboutme, setAboutme, profileimage, setProfileimage, posts, followers, following, error, setError, isLoading } = useUserProfileData()
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const logout = useAuthStore((state) => state.logout)

    const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const newName = event.target.value
        setName(newName)
    }

    const handleSurname = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const newSurname = event.target.value
        setSurname(newSurname)
    }

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const newEmail = event.target.value
        setEmail(newEmail)
    }

    const handleAboutme = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        event.preventDefault()
        const aboutme = event.target.value
        setAboutme(aboutme)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')

        const res = await updateUserProfile({ id: userId, name, surname, email, aboutme })

        if (!res.success) {
            setError(res.message || 'Ocurrió un error inesperado')
            toast.error('Error al actualizar el perfil');
            return
        }

        toast.success('Perfil actualizado correctamente');
    }

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        const res = await uploadUserProfileImage({ userId, file })

        if (!res.success) {
            setError(res.message || 'Ocurrió un error inesperado')
            toast.error('Error al actualizar la imagen de perfil')
            return
        }

        setProfileimage(res.imageUrl || "")
        toast.success('Imagen actualizada correctamente')
    }

    const handleLogout = () => {
        setShowConfirmModal(true);
    }


    if (isLoading) return <Loader />

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 flex items-center justify-center flex-col p-4">
            <section className="w-full max-w-2xl bg-white dark:bg-neutral-600 rounded-2xl p-6 md:p-10 space-y-6 shadow-lg border border-gray-200 dark:border-neutral-700">
                <div className="relative flex justify-center items-start space-y-2">
                    <img
                        src={`${profileimage?.trim() ? profileimage : "placeholder_img_profile.png"}?t=${Date.now()}`}
                        alt="Imagen de perfil"
                        className="w-32 h-32 rounded-full object-cover"
                    />
                    <div className="absolute p-2 ml-40">
                        <label htmlFor="profileImageInput" className="cursor-pointer">
                            <EditIcon className="ursor-pointer" />
                        </label>
                        <input
                            id="profileImageInput"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </div>
                </div>
                <div className="text-md flex justify-center flex-wrap gap-4 md:gap-10">
                    <p><span className="font-bold">{posts}</span> Publicaciones</p>
                    <p><span className="font-bold">{followers}</span> Seguidores</p>
                    <p><span className="font-bold">{following}</span> Siguiendo</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <FormLabel text="Nombre" htmlFor="name" />
                        <FormInputField
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Nombre"
                            value={name}
                            onChange={handleName}
                            error={!!(error && name === "")}
                        />
                    </div>
                    <div>
                        <FormLabel text="Apellidos" htmlFor="surname" />
                        <FormInputField
                            id="surname"
                            name="surname"
                            type="text"
                            placeholder="Apellidos"
                            value={surname}
                            onChange={handleSurname}
                            error={!!(error && surname === "")}
                        />
                    </div>
                    <div>
                        <FormLabel text="Correo electrónico" htmlFor="email" />
                        <FormInputField
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={handleEmail}
                            error={!!(error && email === "")}
                        />
                    </div>
                    <div>
                        <FormLabel text="Sobre mí" htmlFor="aboutme" />
                        <textarea
                            id="aboutme"
                            name="aboutme"
                            rows={5}
                            className="w-full px-3 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-50 focus:outline-none resize-none"
                            placeholder="Cuéntales a todos algo sobre ti..."
                            value={aboutme}
                            onChange={handleAboutme}
                        />
                    </div>

                    {error && (
                        <p id="profileError" className="text-red-600 text-sm text-center">{error}</p>
                    )}

                    <FormButton text="Guardar cambios" />

                    <div className="pt-4 border-t border-neutral-300 dark:border-neutral-500 flex justify-center">
                        <button onClick={handleLogout} type="button" className="text-md font-semibold text-red-700 dark:text-red-400 saturate-150 hover:underline">
                            Cerrar sesión
                        </button>
                    </div>
                </form>
            </section>

            <ConfirmModal
                isOpen={showConfirmModal}
                title="¿Cerrar sesión?"
                message="¿Estás seguro de que quieres cerrar sesión? Tendrás que volver a iniciar sesión para continuar."
                onConfirm={() => logout()}
                onCancel={() => setShowConfirmModal(false)}
                confirmText="Cerrar sesión"
                cancelText="Cancelar"
            />
        </div>
    )
}