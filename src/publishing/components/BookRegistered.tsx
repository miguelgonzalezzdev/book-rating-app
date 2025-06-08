import { useNavigate } from "react-router"

export function BookRegistered() {
    const navigate = useNavigate()

    const handleCLick = () => {
        navigate("/")
    }

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 flex items-center justify-center p-4">
            <section className="w-full max-w-xl bg-white dark:bg-neutral-600 rounded-2xl p-8 md:p-12 shadow-md border border-gray-200 dark:border-neutral-700 flex flex-col gap-8 text-center">
                <h1 className="text-3xl font-semibold">¡Solicitud registrada con éxito!</h1>
                <p className="text-lg">
                    Gracias por enviar tu libro. Los administradores de Biblioclase revisarán la información enviada.
                </p>
                <p className="text-base text-neutral-700 dark:text-neutral-300 italic">
                    Por favor, espera a que un administrador valide tu libro antes de que esté disponible en Biblioclase.
                </p>
                <button
                    type="button"
                    onClick={handleCLick}
                    className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                >
                    Volver al inicio
                </button>
            </section>
        </div>
    )
}