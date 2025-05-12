//import { genres } from '../../core/mocks/genres.json'
import { Alert } from '../../core/components/Alert'
import { useAllGenres } from '../hooks/useGenre'
import { GenreCard } from './GenreCard'
import { SkeletonCard } from './SkeletonCard'

export const GenresList = () => {
    const { genres, isLoading, error } = useAllGenres()

    if (error) {
        return (
            <Alert
                type="error"
                title="Error"
                message="Hubo un error al cargar los géneros. Inténtelo de nuevo más tarde."
            />
        )
    }

    return (
        <div className="w-full lg:w-5/6 xl:w-5/6">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">
                {isLoading ? (
                    Array(12).fill(null).map((_, index) => (
                        <SkeletonCard key={index} />
                    ))
                ) : (
                    genres.map((genre) => (
                        <GenreCard key={genre.id} id={genre.id} name={genre.name} color={genre.color} icon={genre.icon}/>
                    ))
                )}
            </div>
        </div>
    )
} 
