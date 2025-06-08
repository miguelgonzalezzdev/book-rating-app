import { useState } from "react";

const sections = ["usuarios", "libros", "solicitudes"]

export function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("usuarios")

    const renderContent = () => {
        switch (activeTab) {
            case "usuarios":
                return (
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Usuarios</h2>
                        <p>Lista y gestión de usuarios registrados en la plataforma.</p>
                    </div>
                )
            case "libros":
                return (
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Libros</h2>
                        <p>Explora, añade o edita libros disponibles en la biblioteca.</p>
                    </div>
                )
            case "solicitudes":
                return (
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Solicitudes</h2>
                        <p>Revisa las solicitudes enviadas por los usuarios para aprobación.</p>
                    </div>
                )
            default:
                return
        }
    }

    return (
        <div className="flex-grow flex flex-col items-center justify-center m-10 lg:m-20 gap-10 lg:gap-20 text-neutral-900 dark:text-neutral-50">
            <section className="w-full bg-white dark:bg-neutral-600 rounded-2xl p-8 md:p-12 shadow-md border border-gray-200 dark:border-neutral-700 flex flex-col gap-8">
                <nav className="flex justify-center gap-6 border-b border-gray-300 dark:border-neutral-500 pb-4">
                    {sections.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 font-bold rounded-lg transition ${activeTab === tab
                                ? "bg-blue-600 text-white shadow-md"
                                : " hover:text-blue-600"
                                }`}
                            aria-current={activeTab === tab ? "page" : undefined}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </nav>

                <article className="text-center">{renderContent()}</article>
            </section>

        </div>
    )
}
