import { useState, useCallback } from 'react'
import { searchBooks } from '../services/getBook';
import { Book, BookId } from '../../core/types';
import { useAuthStore } from '../../core/store/authStore';
import { registerBookSearch } from '../services/search';

interface UseSearchProps {
  search: string;
}

export function useSearch({ search }: UseSearchProps) {
  const searchText = search
  const [results, setResults] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getResults = useCallback(async ({ search }: { search: string }) => {
    try {
      setIsLoading(true)
      setError(null)
      const newBooks = await searchBooks({ search })
      setResults(newBooks)
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message)
      } else {
        setError('Error desconocido')
      }
    } finally {
      setIsLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText])

  return { results, getResults, isLoading, error }
}

interface UseRegisterBookSearchProps {
  bookId: BookId;
}

export function useRegisterBookSearch({ bookId }: UseRegisterBookSearchProps) {
  const currentAuthUser = useAuthStore((state) => state.user)

  const register = async () => {
    const userId = currentAuthUser?.id
    if (!userId || !bookId) return
    await registerBookSearch({ userId, bookId })
  }

  return { register }
}
