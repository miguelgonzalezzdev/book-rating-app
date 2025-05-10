import debounce from "just-debounce-it";
import { useState, useCallback } from "react"
import { useSearch } from "../hooks/useSearch";
import { SearchBarItem } from "./SearchBarItem";
import { useSearchHistory } from "../hooks/useSearchHistory";

export const SearchBar = () => {
    const [search, setSearch] = useState("");
    const [showResults, setShowResults] = useState(false);
    const { results, getResults, isLoading } = useSearch({ search })
    const {searchHistory} = useSearchHistory();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedGetResults = useCallback(
        debounce((search: string) => {
            getResults({ search })
            setShowResults(true)
        }, 300)
        , [getResults])

    const handleClick = () => {
        setShowResults(true)
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSearch = event.target.value
        setSearch(newSearch)
        setShowResults(false)
        debouncedGetResults(newSearch)
    }

    const handleBlur = () => {
        setTimeout(() => {
            setShowResults(false)
        }, 150)
    }

    return (
        <div className="w-full max-w-xl mx-auto relative">
            <div className="w-full" >
                <div className="relative">
                    <label htmlFor="search" className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none" >
                        <svg className="w-4 h-4 text-neutral-600 dark:text-neutral-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" >
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </label>
                    <input
                        type="text"
                        id="search"
                        value={search}
                        onChange={handleSearch}
                        onFocus={handleClick}
                        onBlur={handleBlur}
                        className="block w-full p-4 ps-10 text-sm text-neutral-900 border border-gray-300 rounded-lg bg-neutral-200 dark:bg-neutral-700 dark:border-neutral-800 dark:placeholder-neutral-500 dark:text-neutral-50"
                        placeholder="Buscar libros..."
                        autoComplete="off"
                    />
                </div>
            </div>

            {showResults && (
                <div className="absolute top-full left-0 w-full max-h-100 overflow-y-auto mt-2 bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-lg shadow-lg z-50">
                    {searchHistory && !search && <p className="p-3 font-bold">Busquedas recientes</p>}
                    <ul className="divide-y divide-neutral-200 dark:divide-neutral-600">
                        {searchHistory && !search && searchHistory.map(book => (
                             <SearchBarItem key={book.id} bookId={book.id} title={book.title} author={book.author} imageUrl={book.imageUrl} />
                        ))}

                        {results && !isLoading && results.map((book => (
                            <SearchBarItem key={book.id} bookId={book.id} title={book.title} author={book.author} imageUrl={book.imageUrl} />
                        )))}
                    </ul>
                </div>
            )}
        </div>
    )
}


/*

*/