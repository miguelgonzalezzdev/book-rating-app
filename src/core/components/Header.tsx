import { useState } from "react";
import { OpenMenuIcon } from "../icons/OpenMenuIcon.tsx"
import { CloseMenuIcon } from "../icons/CloseMenuIcon.tsx"
import { Link } from "react-router";

export function Header () {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const handleOnClick = () => {
        setIsMenuOpen(false)
    }

    return (
        <header className="bg-neutral-200 dark:bg-neutral-700 p-2 sticky top-0 z-900">
            <div className="container mx-auto flex justify-between items-center">
                <Link  to="/" className="text-neutral-900 dark:text-neutral-50 text-2xl font-bold text-center px-2 cursor-pointer">BiblioClase</Link >

                {/* Menú móvil */}
                <button onClick={handleToggleMenu} className="lg:hidden px-2 focus:outline-none">
                    { isMenuOpen 
                        ? <CloseMenuIcon />
                        : <OpenMenuIcon />
                    }
                </button>

                {/* Menú de navegación visible solo en pantallas grandes */}
                <nav className="hidden lg:flex space-x-4 text-neutral-900 dark:text-neutral-50">
                    <Link  to="/" className="px-4 py-2 hover:bg-neutral-300 hover:dark:bg-neutral-600 rounded font-medium">Home</Link >
                    <Link  to="/search" className="px-4 py-2 hover:bg-neutral-300 hover:dark:bg-neutral-600 rounded font-medium">Buscar</Link >
                    <Link  to="/review" className="px-4 py-2 hover:bg-neutral-300 hover:dark:bg-neutral-600 rounded font-medium">Reseña</Link >
                    <Link  to="/profile" className="px-4 py-2 hover:bg-neutral-300 hover:dark:bg-neutral-600 rounded font-medium">Perfil</Link >
                </nav>
            </div>

            {/* Menú desplegable en móviles con transición */}
            <div className={`lg:hidden transition-all duration-200 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <nav className="flex flex-col items-center justify-center bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-50 space-y-2 py-2">
                    <Link  to="/" onClick={handleOnClick} className="px-4 py-2 hover:bg-neutral-300 hover:dark:bg-neutral-600 rounded font-medium">Home</Link >
                    <Link  to="/search" onClick={handleOnClick} className="px-4 py-2 hover:bg-neutral-300 hover:dark:bg-neutral-600 rounded font-medium">Buscar</Link >
                    <Link  to="/review" onClick={handleOnClick} className="px-4 py-2 hover:bg-neutral-300 hover:dark:bg-neutral-600 rounded font-medium">Reseña</Link >
                    <Link  to="/profile" onClick={handleOnClick} className="px-4 py-2 hover:bg-neutral-300 hover:dark:bg-neutral-600 rounded font-medium">Perfil</Link >
                </nav>
            </div>
        </header>
    )
}
