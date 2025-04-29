import { GenresList } from './HistoricList'

export const HomePage = () => {
    return (
        <main className="flex-grow flex flex-col items-center justify-start m-10 lg:m-20 gap-10 lg:gap-20">
            <GenresList />
        </main>
    )
}