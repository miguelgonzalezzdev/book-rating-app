import { useEffect, useState } from "react";
import { Book } from "../../core/types";
import { getSearchHistory } from "../services/search";
import { useAuthStore } from "../../core/store/authStore";

export function useSearchHistory() {
    const currentAuthUser = useAuthStore((state) => state.user)
    const [searchHistory, setSearchHistory] = useState<Book[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchHistory = async () => {
            if (!currentAuthUser) return

            try {
                setIsLoading(true)
                const books = await getSearchHistory(currentAuthUser.id)
                setSearchHistory(books)
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setIsLoading(false)
            }
        }

        fetchHistory()
    }, [currentAuthUser])

    return { searchHistory, isLoading, error }
}
