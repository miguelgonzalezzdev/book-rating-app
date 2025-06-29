//import { useParams } from "react-router"
import { useParams } from "react-router"
import { useBook } from "../hooks/useBooks"
import { GenreTag } from "./GenreTag"
import { Alert } from "../../core/components/Alert"
import { SkeletonBookPage } from "./SkeletonBookPage"
import { StarRating } from "../../core/components/StarRating"
import { BookReviewsList } from "./BookReviewsList"
import { useAuthStore } from "../../core/store/authStore"

export const BookPage = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const { query } = useParams()
  const bookId = query || ""
  const { title, author, year, isbn, publisher, description, imageUrl, bookUrl, genreid1, genreid2, genreid3, rating, pageCount, isLoading, error } = useBook({ bookId })
  const genres = [genreid1, genreid2, genreid3].filter((id) => id != null && id !== 0);

  if (isLoading) return <SkeletonBookPage />

  if (error || !query) {
    return (
      <Alert
        type="error"
        title="Error"
        message="Hubo un error al cargar el libro. Inténtelo de nuevo más tarde."
      />
    )
  }

  return (
    <div className="min-h-screen w-full bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 flex items-center justify-start flex-col gap-10 px-4 py-10">
      <section className="bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 p-4 md:p-16">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-20">
          <div className="flex flex-col items-center justify-start gap-4">
            <div className="w-56 aspect-[3/4] shadow-xl rounded-lg overflow-hidden">
              <img
                src={`${imageUrl?.trim() ? imageUrl : "../../placeholder_img_book.webp"}`}
                alt={`Portada`}
                className="w-full h-full object-cover"
              />
            </div>
            {isAuthenticated &&
              < div className="mt-4">
                <a
                  href={bookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Leer libro
                </a>
              </div>
            }
          </div>

          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2 justify-center items-center text-center md:items-start md:justify-start md:text-left">
              <h1 className="text-4xl font-bold">{title}</h1>
              <p className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
                {author}
              </p>
              <div className="flex items-center gap-1">
                <StarRating initialRating={rating} disabled={true} className="w-8 h-8" />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {genres.map((id) => (
                <GenreTag key={id} genreId={id} />
              ))}
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Resumen</h2>
              <p className="max-w-lg text-md text-neutral-700 dark:text-neutral-300 whitespace-pre-line break-words">{description}</p>
            </div>
            <div className="text-md space-y-2 text-neutral-700 dark:text-neutral-300">
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">Información</h2>
              <p>
                <span className="font-semibold">Editorial:</span> {publisher}
              </p>
              <p>
                <span className="font-semibold">ISBN:</span> {isbn}
              </p>
              <p>
                <span className="font-semibold">Publicado:</span> {year}
              </p>
              <p>
                <span className="font-semibold">Páginas:</span> {pageCount}
              </p>
            </div>
          </div>
        </div>
      </section >
      <section className="w-full md:px-10">
        {isAuthenticated
          ?
          <BookReviewsList bookId={bookId} />
          :
          <div className="max-w-2xl mx-auto px-4">
            <Alert
              type="info"
              title="Reseñas disponibles para usuarios registrados"
              message="Inicia sesión para descubrir lo que otros lectores opinan sobre este libro."
            />
          </div>

        }
      </section>
    </div >
  )
}