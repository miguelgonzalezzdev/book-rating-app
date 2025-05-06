import { Link } from "react-router";
import { FormInputField } from "../../core/components/FormInputField";
import { FormButton } from "../../core/components/FormButton";
import { FormLabel } from "../../core/components/FormLabel";
import { Logo } from "../../core/components/Logo";
import { useRegisterForm } from "../hooks/useRegisterForm";

export const RegisterPage = () => {
    const {
        name,
        surname,
        email,
        password,
        error,
        handleName,
        handleSurname,
        handleEmail,
        handlePassword,
        handleSubmit,
    } = useRegisterForm();

    return (
        <main className="flex-grow flex flex-col items-center justify-center m-10 lg:m-20 gap-10 lg:gap-20">
            <Link to="/">
                <Logo className="max-h-26" />
            </Link>
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
