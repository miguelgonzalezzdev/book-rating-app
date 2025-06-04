import { useNavigate } from "react-router";
import { Historic } from "../../core/types";

interface HistoricCardProps {
    historic: Historic
}

export const HistoricCard = ({ historic }: HistoricCardProps) => {
    const navigate = useNavigate()

    let mensaje = ""
    if(historic.action_type_id===1) mensaje=" ha publicado una reseña"
    if(historic.action_type_id===2) mensaje=" le ha dado like a una reseña"
    if(historic.action_type_id===3) mensaje=" ha comentado una reseña"

    // Formatear fecha
    const auxFormattedDate = new Date(historic.created_at.replace(' ', 'T'))
    const formattedDate = auxFormattedDate.toLocaleString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    const handleClick = () => {
        navigate(`/profile/${historic.user_id}`)
    }

    return (
        <div className="flex flex-col place-content-end p-4 md:p-6 dark:bg-neutral-600 rounded-2xl shadow-md border border-gray-200 dark:border-neutral-700 w-full lg:w-300 h-75">
            <div className="flex items-center gap-3 mb-auto min-w-0">
                <div onClick={handleClick} className="cursor-pointer">
                    <img
                        src={historic.profiles?.profileimage || 'placeholder_img_profile.webp'}
                        alt={`${historic.profiles?.name} profile image`}
                        className="w-10 h-10 rounded-full object-cover shrink-0"
                    />
                </div>
                <p className="flex-1 text-md dark:text-neutral-50">
                    <span onClick={handleClick} className="dark:text-neutral-50 font-bold cursor-pointer">{historic.profiles?.name} {historic.profiles?.surname}</span> {mensaje}
                </p>
            </div>
            <div onClick={handleClick} className="flex flex-row gap-6 my-4 mx-2 md:mx-10 lg:mx-20 p-3 sm:p-4 md:p-6 border border-gray-200 dark:border-neutral-500 cursor-pointer">
                <img
                    src={historic.reviews?.imageurl || 'placeholder_img_book.webp'}
                    className="w-24 h-24 object-cover rounded-none" />
                <p className="w-full text-md dark:text-neutral-50 line-clamp-3">{historic.reviews?.text}</p>
            </div>
            <div className="mt-auto text-xs dark:text-neutral-50 font-medium">{formattedDate}</div>
        </div>
    )
}
