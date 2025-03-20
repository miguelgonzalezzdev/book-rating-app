import { GenresList } from "./GenresList"
import { SearchBar } from "./SearchBar"

export const SearchPage = () => {
    return (
        <main className="flex-grow flex flex-col items-center justify-center m-10 lg:m-20 gap-10 lg:gap-20">
            <SearchBar />
            <GenresList />
        </main>
    )
}