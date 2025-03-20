import { genres } from '../core/mocks/genres.json'

export const GenresList = () => {
    return (
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10 w-full lg:w-5/6'>
            {genres.map((genre) => (
                <div key={genre.id} className="flex flex-col justify-start p-3 lg:p-6 rounded-xl w-full min-h-20 aspect-[2/1]" style={{ backgroundColor: genre.color }}>
                    <h2 className="text-md lg:text-lg lg:text-xl font-bold">{genre.name}</h2>
                </div>
            ))}
        </div>
    )
}