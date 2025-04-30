import { genres } from '../../core/mocks/genres.json'
import { GenreCard } from './GenreCard'

export const GenresList = () => {
    return (
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10 w-full lg:w-5/6'>
            {genres.map((genre) => (
                <GenreCard id={genre.id} name={genre.name} color={genre.color}/>
            ))}
        </div>
    )
} 
