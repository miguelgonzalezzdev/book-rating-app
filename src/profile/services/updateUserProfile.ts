import { supabase } from "../../core/supabase/supabaseClient"
import imageCompression from 'browser-image-compression'

interface UpdateProfileInput {
    id: string
    name: string
    surname: string
    email: string
    aboutme: string
}

export async function updateUserProfile({ id, name, surname, email, aboutme }: UpdateProfileInput) { 
    if (id=="") {
        return { success: false, message: 'ID de usuario no proporcionado' }
    }

    if (name=="" || surname=="" || email=="") {
        return { success: false, message: 'Todos los campos son obligatorios' }
    }

    // Actualizar el email
    const { error: emailError } = await supabase.auth.updateUser({ email })
    if (emailError) {
        return { success: false, message: 'Error al actualizar el email', error: emailError }
    }

    // Actualizar nombre y apellido en la tabla profiles
    const updates: Record<string, string> = {}

    if (name) updates.name = name
    if (surname) updates.surname = surname
    if (aboutme) updates.aboutme = aboutme

    if (Object.keys(updates).length === 0) {
        return { success: false, message: 'No hay datos para actualizar' }
    }

    const { error:profileError } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', id)
        .single()
    if (profileError) {
        return { success: false, message: 'Error al actualizar el perfil', error: profileError }
    }

    return { success: true, message: 'Perfil actualizado correctamente' }
}

interface UploadUserProfileImage {
    userId: string
    file: File
}

export async function uploadUserProfileImage({ userId, file }: UploadUserProfileImage) {
    if (!userId) {
        return { success: false, message: 'ID de usuario no proporcionado' }
    }

    if (!file || file.size === 0) {
        return { success: false, message: 'Imagen no proporcionada' }
    }

    const compressOptions = {
      maxSizeMB: 1, // tamaño máximo en MB
      maxWidthOrHeight: 1920, // redimensionar si es necesario
      useWebWorker: true,
      fileType: 'image/webp',
    }

    const compressedFile = await imageCompression(file, compressOptions)
    const fileName = `${userId}.webp`   // Generar un nombre de archivo único

    // Subir imagen a supabase storage
    const { error: uploadError } = await supabase
        .storage
        .from('profileimages') 
        .upload(fileName, compressedFile, { upsert: true })

    if (uploadError) {
        return { success: false, message: 'Error al subir la imagen', error: uploadError }
    }

    // Obtener URL publica de la imagen subida
    const { data: publicUrlData } = supabase.storage
        .from('profileimages')
        .getPublicUrl(fileName)

    if (!publicUrlData || !publicUrlData.publicUrl) {
        return { success: false, message: 'Error al obtener la URL de la imagen' }
    }

    const imageUrl = publicUrlData.publicUrl

    // Actualizar el profileimage del usuario
    const { error: dbError } = await supabase
        .from('profiles')
        .update({ profileimage: imageUrl })
        .eq('id', userId)
        .single()

    if (dbError) {
        return { success: false, message: 'Error al guardar la URL en el perfil', error: dbError }
    }

    return { success: true, message: 'Imagen de perfil actualizada correctamente', imageUrl }
}
