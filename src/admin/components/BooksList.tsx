import { useBooks } from "../hooks/useBooks"

export function BooksList() {
    const {
        books,
        isLoading,
        error
    } = useBooks()

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
                <thead>
                    <tr className="border-b border-neutral-400 dark:border-neutral-600 text-left">
                        <th className="py-3 px-4 text-sm font-semibold text-left">IMAGEN</th>
                        <th className="py-3 px-4 text-sm font-semibold text-left">TÍTULO</th>
                        <th className="py-3 px-4 text-sm font-semibold text-left">AUTOR</th>
                        <th className="py-3 px-4 text-sm font-semibold text-left">PUBLICADO</th>
                        <th className="py-3 px-4 text-sm font-semibold text-left">GÉNEROS</th>
                        <th className="py-3 px-4 text-sm font-semibold text-left">PÁGINAS</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading &&
                        <tr>
                            <td className="text-center text-neutral-700 dark:text-neutral-300" colSpan={5}>Cargando usuarios...</td>
                        </tr>
                    }

                    {error && !isLoading && books.length === 0 &&
                        <tr>
                            <td className="text-center text-neutral-700 dark:text-neutral-300" colSpan={5}>Error al obtener los usuarios</td>
                        </tr>
                    }

                    {!error && !isLoading && books.length > 0 && books.map((book) => (
                        <tr key={book.id} className="border-b border-gray-300 dark:border-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition">
                            <td className="py-3 px-4 text-left">
                                <div className="w-10 aspect-[3/4] overflow-hidden border-neutral-300 dark:border-neutral-500">
                                    <img
                                        src={book.imageUrl || 'placeholder_img_book.webp'}
                                        alt="Book cover"
                                        className="w-full h-full object-cover" />
                                </div>
                            </td>
                            <td className="py-3 px-4 text-left">{book.title}</td>
                            <td className="py-3 px-4 text-left">{book.author}</td>
                            <td className="py-3 px-4 text-left">{book.year}</td>
                            <td className="py-3 px-4 text-left">{[book.genre1, book.genre2, book.genre3].filter(Boolean).join(', ')}</td>
                            <td className="py-3 px-4 text-left">{book.pageCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
