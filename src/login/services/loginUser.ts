import { supabase } from "../../core/supabase/supabaseClient"

interface LoginInput {
    email: string
    password: string
}

export async function loginUser({ email, password }: LoginInput) {
    // Validar que los campos no esten vacios
    if(!email || !password) {
        return { success: false, message: 'Todos los campos son obligatorios' }
    }

    // Hacer login
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    if (signInError) {
        return { success: false, message: 'Error al iniciar sesión', error: signInError }
    }

    return { success: true, user: signInData }
}
