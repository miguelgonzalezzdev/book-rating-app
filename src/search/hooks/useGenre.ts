
import { useState, useEffect } from "react";
import { getGenre,getAllGenres } from "../services/getGenre"
import { ListOfGenres } from "../../core/types"
import { GenreId } from "../../core/types";

interface UseGenresProps {
    genreId: GenreId;
}

export function useGenre({ genreId }: UseGenresProps) {
    const [genre, setGenre] = useState("");
    const [color, setColor] = useState("");
    const [icon, setIcon] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true)
        const fetchGenres = async () => {
            try {
                const data = await getGenre({genreId});
                setGenre(data.name);
                setColor(data.color);
                setIcon(data.icon);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchGenres();
    }, [genreId]);

    return { genre, color, icon, isLoading, error };
}

export function useAllGenres() {
  const [genres, setGenres] = useState<ListOfGenres>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true)
    const fetchGenres = async () => {
      try {
        const data = await getAllGenres();
        setGenres(data as ListOfGenres);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGenres();
  }, []);

  return { genres, isLoading, error };
}
