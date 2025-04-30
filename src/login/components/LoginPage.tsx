import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { loginUser } from "../services/loginUser";
import { FormInputField } from "../../core/components/FormInputField";

export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate()

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const newEmail = event.target.value
        setEmail(newEmail)
    }

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const newPassword = event.target.value
        setPassword(newPassword)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')

        const res = await loginUser({ email, password })

        if (res.success) {
            navigate('/')
        } else {
            setError(res.message || 'Error al iniciar sesión')
        }
    }

    return (
        <main className="flex-grow flex flex-col items-center justify-center m-10 lg:m-20 gap-10 lg:gap-20">
            <Link to="/" className="text-neutral-900 dark:text-neutral-50 text-5xl font-bold text-center px-2 cursor-pointer">BiblioClase</Link>
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-2xl shadow-md p-8 flex flex-col gap-6">
                <h2 className="text-2xl font-semibold text-center text-neutral-900 dark:text-neutral-50">Iniciar sesión</h2>

                <FormInputField
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={handleEmail}
                    error={!!(error && email === "")}
                />

                <FormInputField
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={handlePassword}
                    error={!!(error && password === "")}
                />

                {error && (
                    <p id="loginError" className="text-red-600 text-sm text-center">{error}</p>
                )}

                <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition duration-200">
                    Entrar
                </button>

                <p className="text-sm text-center text-neutral-500 dark:text-neutral-400">
                    ¿No tienes cuenta? <Link to="/register" className="text-blue-600 hover:underline">Regístrate</Link>
                </p>
            </form>
        </main>
    )
}
