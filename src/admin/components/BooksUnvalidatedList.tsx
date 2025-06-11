import { useBooks } from "../hooks/useBooks"

export function BooksUnvalidatedList() {
    const {
        books,
        isLoading,
        error,
        handleValidateBook
    } = useBooks({ type: 2 })

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
                        <th className="py-3 px-4 text-sm font-semibold text-left">ACCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading &&
                        <tr>
                            <td className="text-center text-neutral-700 dark:text-neutral-300" colSpan={7}>Cargando libros...</td>
                        </tr>
                    }

                    {error && !isLoading && books.length === 0 &&
                        <tr>
                            <td className="text-center text-neutral-700 dark:text-neutral-300" colSpan={7}>Error al obtener los libros</td>
                        </tr>
                    }

                    {!error && !isLoading && books.length === 0 &&
                        < tr >
                            <td className="text-center text-neutral-700 dark:text-neutral-300" colSpan={7}>No se han encontrado libros pendientes de validar</td>
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
                            <td className="py-3 px-4 align-middle text-left">
                                <button
                                    type="button"
                                    onClick={() => handleValidateBook({ bookId: book.id })}
                                    className="bg-green-600 hover:bg-green-700 transition-colors text-white font-bold py-2 px-4 rounded-lg shadow-md"
                                >
                                    Validar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    )
}
