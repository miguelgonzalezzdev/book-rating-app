import { GenreId, GenreName } from "../types"

interface FormGenreSelectorProps {
    id: string
    name: string
    placeholder?: string
    value: string | number
    genres: { id: GenreId; name: GenreName }[]
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
    error?: boolean
    disabled?: boolean
}

export function FormGenreSelector({ id, name, placeholder, value, genres, onChange, error, disabled = false }: FormGenreSelectorProps) {
    return (
        <select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`w-full px-4 py-3 rounded-lg bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-50 border ${error
                ? "border-red-500 focus:ring-red-500"
                : "border-neutral-300 dark:border-transparent focus:ring-blue-500"
                } focus:outline-none focus:ring-2 transition-all`}
        >
            <option value="">{placeholder}</option>
            {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                    {genre.name}
                </option>
            ))}
        </select>
    )
}