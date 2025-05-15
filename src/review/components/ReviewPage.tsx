import { SearchListIcon } from "../../core/icons/SearchListIcon"
import { SquareNewIcon } from "../../core/icons/SquareNewIcon"
import { useState } from "react"
import { BookSearchModal } from "./BookSearchModal"
import { ReviewModal } from "./ReviewModal"

export function ReviewPage() {
    const [bookSeleted, setBookSeleted] = useState(""); 
    const [showModalSearch, setShowModalSearch] = useState(false);
    const [showModalReview, setShowModalReview] = useState(false);

    const handleSelectExistingBook = () => {
        setShowModalSearch(true)
    }

    const handleBookSelected = ({ newBooKSeleted }: {newBooKSeleted: string}) => {
        setBookSeleted(newBooKSeleted)
        setShowModalSearch(false)
        setShowModalReview(true)
    }

    const handleSelectNewBook = () => {
        setBookSeleted("")
        setShowModalReview(true)
    }

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 flex items-center justify-center p-4">
            <section className="w-full max-w-2xl bg-white dark:bg-neutral-600 rounded-2xl p-6 md:p-12 shadow-md border border-gray-200 dark:border-neutral-700 flex flex-col gap-10">
                <h1 className="text-2xl md:text-3xl text-center font-semibold">¿Qué libro deseas reseñar?</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <button onClick={handleSelectExistingBook} type="button" className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl border border-neutral-300 dark:border-neutral-500 bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-all">
                        <SearchListIcon width={40} height={40} />
                        <h2 className="text-lg font-semibold">Libro existente</h2>
                        <p className="text-sm text-neutral-700 dark:text-neutral-300 text-center">
                            Busca un libro que ya está en Biblioclase y escribe tu reseña
                        </p>
                    </button>
                    <button onClick={handleSelectNewBook} type="button" className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl border border-neutral-300 dark:border-neutral-500 bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-all">
                        <SquareNewIcon width={40} height={40} />
                        <h2 className="text-lg font-semibold">Otro libro</h2>
                        <p className="text-sm text-neutral-700 dark:text-neutral-300 text-center">
                            Reseña un libro que aún no esté en Biblioclase
                        </p>
                    </button>
                </div>
            </section>

            <BookSearchModal isOpen={showModalSearch} onClick={handleBookSelected} onClose={() => setShowModalSearch(false)} />
            <ReviewModal key={bookSeleted} isOpen={showModalReview} bookId={bookSeleted} onClose={() => setShowModalReview(false)} />
        </div>
    )
}
