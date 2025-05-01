import { Genre } from "../../core/types"

export const GenreCard = ({ id, name, color }: Genre) => {
    return (
        <div key={id} className="flex flex-col justify-start p-3 lg:p-6 rounded-xl w-full min-h-20 aspect-[2/1] cursor-pointer" style={{ backgroundColor: color }}>
            <h2 className="text-md lg:text-lg lg:text-xl font-bold ">{name}</h2>
        </div>
    )
}
