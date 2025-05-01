import { supabase } from "../../core/supabase/supabaseClient";

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

    const fileExt = file.name.split('.').pop() // Obtener la extensión del archivo
    const fileName = `${userId}.${fileExt}`   // Generar un nombre de archivo único

    // Subir imagen a supabase storage
    const { error: uploadError } = await supabase
        .storage
        .from('profileimages') 
        .upload(fileName, file, { upsert: true })

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

    // Actualizar columna profileimage en la tabla profiles
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
