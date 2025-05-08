import { useState } from "react"

export const SearchBar = () => {
    const initialResults = [
        "Cien años de soledad",
        "El principito",
        "1984",
        "Don Quijote de la Mancha",
        "Los tres cerditos",
        "Harry Potter"
    ]

    const [search, setSearch] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState<string[]>([]);

    const handleClick = () => {
        setShowResults(true)
        setResults(initialResults)
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const newSearch = event.target.value
        setSearch(newSearch)
    }

    const handleBlur = () => {
        setShowResults(false)
    };

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
                    <p className="p-3 font-bold">Busquedas recientes</p>
                    <ul className="divide-y divide-neutral-200 dark:divide-neutral-600">
                        {results
                            .filter((r) => r.toLowerCase().includes(search.toLowerCase()))
                            .map((result, i) => (
                                <li key={i} className="p-3 hover:bg-neutral-100 dark:hover:bg-neutral-600 cursor-pointer">
                                    {result}
                                </li>
                            ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

