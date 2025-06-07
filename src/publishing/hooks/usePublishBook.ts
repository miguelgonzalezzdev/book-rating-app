import { useState } from "react"

const currentYear = new Date().getFullYear();

export function usePublishBook() {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [year, setYear] = useState(currentYear)
    const [isbn, setIsbn] = useState("")
    const [publisher, setPublisher] = useState("")
    const [pages, setPages] = useState(0)
    const [description, setDescription] = useState("")
    const [genreid1, setGenreid1] = useState(0)
    const [genreid2, setGenreid2] = useState(0)
    const [genreid3, setGenreid3] = useState(0)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imageUrl, setImageUrl] = useState("")
    const [bookFile, setBookFile] = useState<File | null>(null)
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError("")
        event.preventDefault()
        const newTitle = event.target.value
        setTitle(newTitle)
    }

    const handleAuthor = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError("")
        event.preventDefault()
        const newAuthor = event.target.value
        setAuthor(newAuthor)
    }

    const handleYear = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError("")
        event.preventDefault()
        const newYear = Number(event.target.value)
        setYear(newYear)
    }

    const handleIsbn = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError("")
        event.preventDefault()
        const newIsbn = event.target.value
        setIsbn(newIsbn)
    }

    const handlePublisher = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError("")
        event.preventDefault()
        const newPublisher = event.target.value
        setPublisher(newPublisher)
    }

    const handlePages = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError("")
        event.preventDefault()
        const newPages = Number(event.target.value)
        setPages(newPages)
    }

    const handleDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setError("")
        event.preventDefault()
        const newDescription = event.target.value
        setDescription(newDescription)
    }

    // Para guardar y mostrar la imagen seleccionada
    const handleImageSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError("")
        const file = event.target.files?.[0]
        if (!file) return

        if (file) {
            setImageFile(file)
            const newImageUrl = URL.createObjectURL(file)
            setImageUrl(newImageUrl)
        }
    }

    const handleBookFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setBookFile(file)
        }
    }

    const handleSubmitBook = () => {

    }

    return {
        title,
        author,
        year,
        isbn,
        publisher,
        pages,
        description,
        genreid1,
        genreid2,
        genreid3,
        imageFile,
        imageUrl,
        bookFile,
        error,
        isLoading,
        handleTitle,
        handleAuthor,
        handleYear,
        handleIsbn,
        handlePublisher,
        handlePages,
        handleDescription,
        handleImageSelected,
        handleBookFile,
        handleSubmitBook
    }
}