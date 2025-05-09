import { useNavigate, useParams } from "react-router"
import { useGenre } from "../hooks/useGenre"
import { useEffect } from "react"
import { Alert } from "../../core/components/Alert"
import { BookListItem } from "./BookListItem"
import { useAllBooksByGenre } from "../hooks/useBooks"
import { SkeletonBooksList } from "./SkeletonBooksList"

export const BooksList = () => {
  const { query } = useParams()
  const genreIdNumber = Number(query)
  const { genre, color, isLoading, error } = useGenre({ genreId: genreIdNumber || 0 })
  const { books, isLoading: isLoadingBooks, error: errorBooks } = useAllBooksByGenre({ genreId: genreIdNumber || 0 })
  const navigate = useNavigate()

  useEffect(() => {
    if (!genreIdNumber || genreIdNumber == 0) {
      navigate('/search')
    }
  }, [genreIdNumber, navigate])

  if (error || errorBooks) {
    return (
      <div className="m-10">
        <Alert
          type="error"
          title="Error"
          message="Hubo un error al buscar. Inténtelo de nuevo más tarde."
        />
      </div>
    )
  }

  if (isLoading || isLoadingBooks) {
    return (
      <SkeletonBooksList />
    )
  }

  return (
    <section className="bg-neutral-50 dark:bg-neutral-800 min-h-screen">
      <div className="relative mb-6">
        <h1 className="absolute left-10 top-1/2 -translate-y-1/2 text-4xl font-bold text-neutral-900 dark:text-neutral-50 z-10 drop-shadow-sm">
          {genre}
        </h1>
        <div
          className="w-full h-56 flex items-center justify-start shadow-lg z-0 [mask-image:linear-gradient(to_bottom,black,transparent)]"
          style={{ backgroundColor: color }}
        />
      </div>
      <ul className="grid mx-6">
        {books && books.length > 0 ? (
          books.map((book) => (
            <BookListItem
              key={book.id}
              bookId={book.id}
              title={book.title}
              author={book.author}
              rating={book.rating}
              imageUrl={book.imageUrl}
            />
          ))
        ) : (
          <li className="mt-10 text-lg md:text-xl text-center text-neutral-700 dark:text-neutral-300">
            No se han encontrado resultados
          </li>
        )}
      </ul>
    </section >
  )
}
