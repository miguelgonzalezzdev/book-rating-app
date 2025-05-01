import { FormInputField } from "../../core/components/FormInputField";
import { updateUserProfile } from "../services/updateUserProfile";
import { useUserProfileData } from "../hooks/useUserProfileData";
import { toast } from 'react-hot-toast';
import { Loader } from "../../core/components/Loader";
import { EditIcon } from "../../core/icons/EditIcon";
import { uploadUserProfileImage } from "../services/uploadUserProfileImage";

export function ProfilePage() {
    const { userId, name, setName, surname, setSurname, email, setEmail, aboutme, setAboutme, profileimage, setProfileimage, error, setError, isLoading } = useUserProfileData()

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

        const res = await uploadUserProfileImage({userId, file})

        if (!res.success) {
            setError(res.message || 'Ocurrió un error inesperado')
            toast.error('Error al actualizar la imagen de perfil')
            return
        }

        setProfileimage(res.imageUrl || "")
        toast.success('Imagen actualizada correctamente')
    }

    if (isLoading) return <Loader />

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 flex items-center justify-center flex-col p-4">
            <section className="w-full max-w-2xl bg-white dark:bg-neutral-600 rounded-2xl p-6 md:p-10 space-y-6 shadow-md border border-gray-200 dark:border-neutral-700">
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

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm text-neutral-700 dark:text-neutral-300 mb-1 font-semibold">Nombre</label>
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
                        <label className="block text-sm text-neutral-700 dark:text-neutral-300 mb-1 font-semibold">Apellidos</label>
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
                        <label className="block text-sm text-neutral-700 dark:text-neutral-300 mb-1 font-semibold">Email</label>
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
                        <label className="block text-sm text-neutral-700 dark:text-neutral-300 mb-1 font-semibold">Sobre mí</label>
                        <textarea
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

                    <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition duration-200">
                        Guardar cambios
                    </button>
                </form>
            </section>
        </div>
    )
}