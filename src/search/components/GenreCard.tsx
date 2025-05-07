import { useNavigate } from "react-router";
import { Genre } from "../../core/types"

export const GenreCard = ({ id, name, color }: Genre) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/search/${id}`);
    }

    return (
        <div
            key={id}
            onClick={handleClick}
            className="flex flex-col justify-start p-3 lg:p-6 rounded-2xl w-full min-h-20 aspect-[2/1] cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ring-1 ring-black/5 dark:ring-white/10"
            style={{ backgroundColor: color }}
        >
            <h2 className="text-md lg:text-xl font-bold text-neutral-900 dark:text-neutral-50 drop-shadow-sm">{name}</h2>
        </div>
    )
}
