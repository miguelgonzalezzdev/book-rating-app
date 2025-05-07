
export const SearchBar = () => {
    return (
        <form className="w-full  max-w-xl mx-auto">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-neutral-900 sr-only dark:text-neutral-50" >
                Search
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-neutral-600 dark:text-neutral-50" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-neutral-900 border border-gray-300 rounded-lg bg-neutral-200 dark:bg-neutral-700 dark:border-neutral-800 dark:placeholder-neutral-500 dark:text-neutral-50" placeholder="Buscar libros..." />
            </div>
        </form>
    )
}

/*
<button type="submit" className="text-neutral-50 absolute end-2.5 bottom-2.5 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Search
                </button>
*/