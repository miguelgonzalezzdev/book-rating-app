import { supabase } from "../../core/supabase/supabaseClient"

interface RegisterInput {
    name: string
    surname: string
    email: string
    password: string
}

export async function registerUser({ name, surname, email, password }: RegisterInput) {
    // Validar que los campos no esten vacios
    if(!name || !surname || !email || !password) {
        return { success: false, message: 'Todos los campos son obligatorios' }
    }

    if(password.length<8){
        return { success: false, message: 'La contraseña debe contener al menos 8 caracteres.' }
    }

    // Crear usuario con email y password
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password
    })

    // Si hay un error al crear el usuario
    if (signUpError) {
        return { success: false, message: 'Error al registrarse', error: signUpError }
    }

    const userId = signUpData.user?.id
    if (!userId) {
        return { success: false, message: 'ID de usuario no disponible tras registro' }
    }

    // Guardar el name y surname en la tabla 'profiles'
    const { error: insertError } = await supabase
        .from('profiles')
        .insert({ id: userId, name, surname })

    if (insertError) {
        return { success: false, message: 'Error al registrarse', error: insertError }
    }

    return { success: true, user: signUpData.user }
}
