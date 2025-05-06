
import { useState, useEffect } from "react";
import { getAllGenres } from "../services/getAllGenres"; 
import { ListOfGenres } from "../../core/types"

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
