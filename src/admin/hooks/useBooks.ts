/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAuthStore } from "../../core/store/authStore";
import { getAllBooks, getAllBooksUnvalidated, setBookValidated } from "../services/books";
import { BookId } from "../../core/types";
import toast from "react-hot-toast";

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

interface UseBooksProps {
    type: number // 1=validados, 2=NO validados
}

export function useBooks({ type }: UseBooksProps) {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated)
    const [books, setBooks] = useState<BookInfo[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        if (!isAuthenticated || !type || type < 0) return

        const fetchAllUsers = async () => {
            try {
                setIsLoading(true)

                let data

                if (type === 1) {
                    data = await getAllBooks()
                }

                if (type === 2) {
                    data = await getAllBooksUnvalidated()
                }

                if (!data || !data.success) {
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

    const validateBook = async ({ bookId }: { bookId: BookId }) => {
        if (!isAuthenticated || !bookId) return

        try {
            const result = await setBookValidated({ bookId })

            if(!result.success) {
                toast.error('Error al validar el libro')
                return
            }

            toast.success('Libro validado correctamente')

            const filteredBook = books.filter(book => book.id!==bookId)
            setBooks(filteredBook)
        } catch {
            toast.error('Error al validar el libro')
        }
    }

    const handleValidateBook = ({ bookId }: { bookId: BookId }) => {
        validateBook({ bookId })
    }

    return {
        books,
        isLoading,
        error,
        handleValidateBook
    }
}