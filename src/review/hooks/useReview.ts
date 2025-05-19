import { useEffect, useState } from "react";
import { registerReviewForExistingBook, registerReviewForNewBook } from "../services/review";
import { useNavigate } from "react-router";
import { getBookSelectedById } from "../services/searchBooks";

interface UseReviewProps {
    bookId?: string;
}

export const useReview = ({ bookId }: UseReviewProps) => {
    const [bookName, setBookName] = useState('')
    const [authorName, setAuthorName] = useState('')
    const [rating, setRating] = useState(0)
    const [reviewText, setReviewText] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [isFetching, setIsFetching] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    // Obtener datos del libro si hay bookId
    useEffect(() => {
        const fetchBookData = async () => {
            if (!bookId) return

            setIsFetching(true)

            const data = await getBookSelectedById({ bookId })

            setBookName(data.title || '')
            setAuthorName(data.author || '')
            setImageUrl(data.imageUrl || '')

            setIsFetching(false)
        }

        fetchBookData()
    }, [bookId])

    const handleBookName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError("")
        event.preventDefault()
        const newBookName = event.target.value
        setBookName(newBookName)
    }

    const handleAuthorName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError("")
        event.preventDefault()
        const newAuthorName = event.target.value
        setAuthorName(newAuthorName)
    }

    const handleReviewText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setError("")
        event.preventDefault()
        const newReviewText = event.target.value
        setReviewText(newReviewText)
    }

    const handleImageSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError("")
        const file = e.target.files?.[0]
        if (!file) return

        if (file) {
            setImageFile(file)
            const newImageUrl = URL.createObjectURL(file)
            setImageUrl(newImageUrl)
        }
    }

    const handleSubmitReview = async () => {
        if (!bookName.trim() || !authorName.trim() || !rating || !reviewText.trim()) {
            setError("Todos los campos son obligatorios")
            return
        }

        try {
            setIsLoading(true)
            setError("")

            let res

            if (bookId?.trim()) {
                res = await registerReviewForExistingBook({ bookId, bookName, authorName, rating, reviewText, imageUrl })
            } else {
                res = await registerReviewForNewBook({ bookName, authorName, rating, reviewText, imageFile })
            }

            if (res.success) {
                navigate("/profile");
            }

            if (!res.success) {
                setError(res.message || 'Ocurrió un error inesperado')
                return
            }

        } catch (err) {
            setError(err instanceof Error ? err.message : String(err));
        } finally {
            setIsLoading(false)
        }
    }

    return {
        bookName,
        authorName,
        rating,
        setRating,
        reviewText,
        imageUrl,
        isFetching,
        isLoading,
        error,
        handleBookName,
        handleAuthorName,
        handleReviewText,
        handleImageSelected,
        handleSubmitReview
    }
}
