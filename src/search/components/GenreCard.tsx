import { useNavigate } from "react-router";
import { Genre } from "../../core/types"
import { RenderIcon } from "../../core/components/RenderIcon";

export const GenreCard = ({ id, name, color, icon }: Genre) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/search/${id}`);
    }

    return (
        <div
            key={id}
            onClick={handleClick}
            className="flex flex-col justify-start p-3 lg:p-6 rounded-2xl w-full min-h-20 lg:min-h-30 aspect-[2/1] cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ring-1 ring-black/5 dark:ring-white/10 relative"
            style={{ backgroundColor: color }}
        >
            <h2 className="text-md lg:text-xl font-bold text-neutral-900 dark:text-neutral-50 drop-shadow-sm">{name}</h2>
            <div className="flex justify-end mt-auto">
                <RenderIcon icon={icon} className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 2xl:w-16 2xl:h-16 absolute bottom-2 right-3 z-40 text-neutral-900 dark:text-neutral-50" />
            </div>
        </div>
    )
}
