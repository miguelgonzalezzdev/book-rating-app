import toast from 'react-hot-toast'
import { useHistoric } from '../hooks/useHistoric'
import { HistoricCard } from './HistoricCard'
import { SkeletonHistoricCard } from './SkeletonHistoricCard'

export const HistoricList = () => {
    const { historicList, isLoading, error } = useHistoric()

    if (isLoading) {
        return (
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 w-full">
                {Array.from({ length: 5 }).map((_, index) => (
                    <SkeletonHistoricCard key={index} />
                ))}
            </div>
        )
    }

    if (error) {
        toast.error("Ocurrió un error. Por favor, inténtalo de nuevo más tarde.");
        return (
            <h3 className='text-lg text-neutral-700 dark:text-neutral-300 flex flex-wrap items-center justify-center mt-10 w-full'>
                Parece que no hay nada por aquí...
            </h3>
        )
    }

    if (historicList.length === 0) {
        return (
            <h3 className='text-lg text-neutral-700 dark:text-neutral-300 flex flex-wrap items-center justify-center mt-10 w-full'>
                Parece que no hay nada por aquí...
            </h3>
        )
    }

    return (
        <div className='flex flex-wrap items-center justify-center gap-6 md:gap-10 w-full'>
            {historicList.map((historic) => (
                <HistoricCard key={historic.id} historic={historic} />
            ))}
        </div>
    )
}
