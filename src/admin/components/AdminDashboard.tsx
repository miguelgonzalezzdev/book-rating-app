import { useState } from "react";
import { UsersList } from "./UsersList";
import { BooksList } from "./BooksList";
import { BooksUnvalidatedList } from "./BooksUnvalidatedList";

const sections = ["usuarios", "libros", "solicitudes"]

export function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("usuarios")

    const renderContent = () => {
        switch (activeTab) {
            case "usuarios":
                return (
                    <UsersList />
                )
            case "libros":
                return (
                    <BooksList />
                )
            case "solicitudes":
                return (
                    <BooksUnvalidatedList />
                )
            default:
                return
        }
    }

    return (
        <div className="flex-grow flex flex-col items-center justify-center m-10 lg:m-20 gap-10 lg:gap-20 text-neutral-900 dark:text-neutral-50">
            <section className="w-full bg-white dark:bg-neutral-600 rounded-2xl p-8 md:p-12 shadow-md border border-gray-200 dark:border-neutral-700 flex flex-col gap-4">
                <nav className="flex justify-center flex-col md:flex-row gap-6 border-b border-gray-300 dark:border-neutral-500 pb-4">
                    {sections.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 font-bold rounded-lg transition ${activeTab === tab
                                ? "bg-blue-600 text-white shadow-md"
                                : "hover:bg-neutral-300 dark:hover:bg-neutral-500"
                                }`}
                            aria-current={activeTab === tab ? "page" : undefined}
                            type="button"
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
