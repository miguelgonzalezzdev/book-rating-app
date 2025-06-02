import { useCallback, useEffect, useRef, useState } from "react";
import { useBookSearchSelect } from "../hooks/useBookSearchSelect";
import { BookSearchModalItem } from "./BookSearchModalItem";
import debounce from "just-debounce-it";
import { CloseIcon } from "../../core/icons/CloseIcon";

interface BookSearchModalProps {
    isOpen: boolean
    onClick: (args: { newBooKSeleted: string }) => void;
    onClose: () => void
}

export function BookSearchModal({ isOpen, onClick, onClose }: BookSearchModalProps) {
    const [search, setSearch] = useState("")
    const [showResults, setShowResults] = useState(false)
    const { results, getResults, isLoading } = useBookSearchSelect({ search })
    const modalRef = useRef<HTMLDivElement>(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedGetResults = useCallback(
        debounce((search: string) => {
            getResults({ search })
            setShowResults(true)
        }, 500), [getResults])

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSearch = event.target.value
        setSearch(newSearch)
        setShowResults(false)
        debouncedGetResults(newSearch)
    }

    useEffect(() => {
        const  handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-brightness-35 backdrop-blur-xs flex items-start justify-center z-50 overflow-y-auto">
            <div ref={modalRef} className="w-full max-w-xl bg-white dark:bg-neutral-600 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-neutral-700 mt-20 md:mt-30 mx-2">
                <div className="relative flex items-center gap-3">
                    <label htmlFor="book-search" className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-neutral-600 dark:text-neutral-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" >
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </label>

                    <input
                        id="book-search"
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        placeholder="Buscar libros..."
                        className="flex-1 p-4 ps-10 text-sm text-neutral-900 border border-gray-300 rounded-lg bg-neutral-200 dark:bg-neutral-700 dark:border-neutral-800 dark:placeholder-neutral-500 dark:text-neutral-50"
                        autoComplete="off"
                    />

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-neutral-600 dark:text-neutral-200 hover:scale-110 transition-transform"
                        aria-label="Cerrar buscador"
                    >
                        <CloseIcon width={40} height={40} />
                    </button>
                </div>

                {showResults && search && (
                    <div className="mt-4 max-h-85 overflow-y-auto rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-700 shadow-inner">
                        {results.length === 0 && !isLoading && (
                            <p className="p-4 text-center text-neutral-700 dark:text-neutral-200">Sin resultados</p>
                        )}
                        {results.map((book) => (
                            <BookSearchModalItem
                                key={book.id}
                                bookId={book.id}
                                title={book.title}
                                author={book.author}
                                imageUrl={book.imageUrl}
                                onClick={onClick}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
