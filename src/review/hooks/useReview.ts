import { useState } from "react";
import { registerReview } from "../services/review";
import { useNavigate } from "react-router";

interface UseReviewProps{
    bookId?: string;
}

export const useReview = ({ bookId }: UseReviewProps) => {
    const [bookName, setBookName] = useState('')
    const [authorName, setAuthorName] = useState('')
    const [rating, setRating] = useState(0)
    const [reviewText, setReviewText] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleBookName = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const newBookName = event.target.value
        setBookName(newBookName)
    }

    const handleAuthorName = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const newAuthorName = event.target.value
        setAuthorName(newAuthorName)
    }

    const handleReviewText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        event.preventDefault()
        const newReviewText = event.target.value
        setReviewText(newReviewText)
    }

    const handleImageSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (file) {
            setImageFile(file)
            const newImageUrl = URL.createObjectURL(file)
            setImageUrl(newImageUrl)
        }
    }

    const handleSubmitReview = async () => {
        setIsLoading(true)
        setError("")

        const res = await registerReview({ bookId, bookName, authorName, rating, reviewText, imageFile })

        setIsLoading(false)
        if (res.success) {
            navigate("/profile");
        } else {
            setError(res.message || "Error al guardar la reseña");
        }
    }

    return {
        bookName,
        authorName,
        rating,
        setRating,
        reviewText,
        imageUrl,
        isLoading,
        error,
        handleBookName,
        handleAuthorName,
        handleReviewText,
        handleImageSelected,
        handleSubmitReview
    }
}
