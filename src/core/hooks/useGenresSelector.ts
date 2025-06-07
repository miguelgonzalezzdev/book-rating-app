import { useEffect, useState } from "react";
import { getGenresOptions } from "../services/genresOptions";
import { GenreId, GenreName } from "../types";

export function useGenresSelector() {
    const [genres, setGenres] = useState<{ id: GenreId; name: GenreName }[]>([])
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const  fetchAllGenres = async () => {
            try {
                setIsLoading(true)

                const data = await getGenresOptions()

                if(!data.success) {
                    setError("Error al obtener los géneros")
                    return
                }

                setGenres(data.genres)

            } catch {
                setError("Error al obtener los géneros")
            } finally {
                setIsLoading(false)
            }
        }

        fetchAllGenres()
    }, [])

    return { genres,error,isLoading }
}