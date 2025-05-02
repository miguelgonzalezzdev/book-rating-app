import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { registerUser } from "../services/registerUser";
import { FormInputField } from "../../core/components/FormInputField";
import { FormButton } from "../../core/components/FormButton";
import { FormLabel } from "../../core/components/FormLabel";

export const RegisterPage = () => {
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

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

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const newPassword = event.target.value
        setPassword(newPassword)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')

        const res = await registerUser({ name, surname, email, password })

        if (res.success) {
            navigate('/profile')
        } else {
            setError(res.message || 'Error al registrarse')
        }
    }

    return (
        <main className="flex-grow flex flex-col items-center justify-center m-10 lg:m-20 gap-10 lg:gap-20">
            <Link to="/" className="text-neutral-900 dark:text-neutral-50 text-5xl font-bold text-center px-2 cursor-pointer">BiblioClase</Link>
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-2xl shadow-md p-8 flex flex-col gap-6">
                <h2 className="text-2xl font-semibold text-center text-neutral-900 dark:text-neutral-50">Regístrate</h2>

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
                        type="temailext"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={handleEmail}
                        error={!!(error && email === "")}
                    />
                </div>

                <div>
                    <FormLabel text="Contraseña" htmlFor="password" />
                    <FormInputField
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={handlePassword}
                        error={!!(error && password === "")}
                    />
                </div>

                {error && (
                    <p id="registerError" className="text-red-600 text-sm text-center">{error}</p>
                )}

                <FormButton text="Enviar" />

                <p className="text-sm text-center text-neutral-500 dark:text-neutral-400">
                    ¿Ya tienes una cuenta? <Link to="/login" className="text-blue-600 hover:underline">Accede</Link>
                </p>
            </form>
        </main>
    )
}
