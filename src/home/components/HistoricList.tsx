import { historical } from '../../core/mocks/historic.json'
import { HistoricCard } from './HistoricCard'

export const HistoricList = () => {
    return (
        <div className='flex flex-wrap items-center justify-center gap-6 md:gap-10 w-full'>
            {historical.map((historic) => (
                <HistoricCard key={historic.id} historic={historic} />
            ))}
        </div>
    )
}
