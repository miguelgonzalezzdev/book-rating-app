/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAuthStore } from "../../core/store/authStore";
import { getAllBooks } from "../services/books";

interface BookInfo {
    id: string
    title: string
    author: string
    year: string
    isbn: string
    publisher: string
    description: string
    genre1: string
    genre2: string
    genre3: string
    imageUrl: string
    bookUrl: string
    rating: number
    pageCount: number
}

export function useBooks() {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated)
    const [books, setBooks] = useState<BookInfo[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        if (!isAuthenticated) return

        const fetchAllUsers = async () => {
            try {
                setIsLoading(true)

                const data = await getAllBooks()

                if (!data.success) {
                    setError("Error al obtener los libros")
                    return
                }

                setBooks(data.data ?? [])

            } catch {
                setError("Error al obtener los libros")
            } finally {
                setIsLoading(false)
            }
        }

        fetchAllUsers()
    }, [])

    return {
        books,
        isLoading,
        error
    }
}