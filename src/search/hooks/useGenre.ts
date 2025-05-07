
import { useState, useEffect } from "react";
import { getGenre } from "../services/getGenre";
import { GenreId } from "../../core/types";

interface UseGenresProps {
    genreId: GenreId;
}

export function useGenre({ genreId }: UseGenresProps) {
    const [genre, setGenre] = useState("");
    const [color, setColor] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true)
        const fetchGenres = async () => {
            try {
                const data = await getGenre({genreId});
                setGenre(data.name);
                setColor(data.color);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchGenres();
    }, [genreId]);

    return { genre, color, isLoading, error };
}