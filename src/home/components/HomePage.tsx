import { HistoricList } from './HistoricList'
import { useAuthStore } from '../../core/store/authStore'
import { Link } from 'react-router';

export const HomePage = () => {
    const currentAuthUser = useAuthStore((state) => state.user)

    if (!currentAuthUser) {
        return (
            <div className="flex items-center justify-center flex-col gap-2 min-h-screen w-full">
                <h2 className="text-center text-2xl font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
                    Bienvenido a Biblioclase
                </h2>
                <p className="text-center  text-neutral-700 dark:text-neutral-300 mb-6">
                    Regístrate o inicia sesión para acceder al contenido
                </p>
                <div className="flex justify-center gap-4">
                    <Link to="/login" className="px-4 py-2 rounded-lg bg-blue-600 text-white dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 transition font-semibold">Iniciar sesión</Link>
                    <Link to="/register" className="px-4 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-500 text-neutral-900 dark:text-neutral-50 hover:bg-neutral-300 dark:hover:bg-neutral-400 transition font-semibold">Registrarse</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="flex-grow flex flex-col items-center justify-start m-4 md:m-10 lg:m-20 gap-10 lg:gap-20">
            <HistoricList />
        </div>
    )
}