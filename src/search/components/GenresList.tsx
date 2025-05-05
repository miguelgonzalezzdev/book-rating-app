//import { genres } from '../../core/mocks/genres.json'
import { Alert } from '../../core/components/Alert'
import { Loader } from '../../core/components/Loader'
import { useGenres } from '../hooks/useGenres'
import { GenreCard } from './GenreCard'

export const GenresList = () => {
    const { genres, isLoading, error } = useGenres()

    if (isLoading) return <Loader />

    return (
        <div className="w-full lg:w-5/6">
            {error ? (
                <Alert
                    type="error"
                    title="Error"
                    message="Hubo un error al cargar los géneros. Inténtelo de nuevo más tarde."
                />
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">
                    {genres.map((genre) => (
                        <GenreCard key={genre.id} id={genre.id} name={genre.name} color={genre.color} />
                    ))}
                </div>
            )}
        </div>
    )
} 
