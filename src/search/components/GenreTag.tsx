import { useNavigate } from "react-router";
import { useGenre } from "../hooks/useGenre";
import { SkeletonGenreTag } from "./SkeletonGenreTag";

interface GenreIdProps {
    genreId: number;
}

export function GenreTag({ genreId }: GenreIdProps) {
    const { genre,color,isLoading,error } = useGenre({genreId})

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/search/${genreId}`);
    }

    if(isLoading || error) return <SkeletonGenreTag />

    return (
        <button onClick={handleClick} className="text-md px-3 py-1 rounded cursor-pointer font-bold text-neutral-900 dark:text-neutral-50 drop-shadow-sm" style={{ backgroundColor: color }}>
            {genre}
        </button>
    )
}
