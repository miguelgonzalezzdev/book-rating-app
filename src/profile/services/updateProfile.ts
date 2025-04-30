import { supabase } from "../../core/supabase/supabaseClient"

interface UpdateProfileInput {
    id: string
    name: string
    surname: string
    email: string
    aboutme: string
}

export async function updateUserProfile({ id, name, surname, email, aboutme }: UpdateProfileInput) { console.log(id, name, surname, email, aboutme)
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
