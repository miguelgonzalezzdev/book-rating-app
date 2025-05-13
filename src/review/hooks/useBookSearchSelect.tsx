import { useState, useCallback } from 'react'
import { Book } from '../../core/types'
import { getBooksForSelect } from '../services/searchBooks';

interface UseSearchProps {
  search: string;
}

export function useBookSearchSelect({ search }: UseSearchProps) {
  const searchText = search
  const [results, setResults] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getResults = useCallback(async ({ search }: { search: string }) => {
    try {
      setIsLoading(true)
      setError(null)
      const newBooks = await getBooksForSelect({ search })
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
