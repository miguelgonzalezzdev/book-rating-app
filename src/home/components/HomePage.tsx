import { HistoricList } from './HistoricList'

export const HomePage = () => {
    return (
        <div className="flex-grow flex flex-col items-center justify-start m-4 md:m-10 lg:m-20 gap-10 lg:gap-20">
            <HistoricList />
        </div>
    )
}