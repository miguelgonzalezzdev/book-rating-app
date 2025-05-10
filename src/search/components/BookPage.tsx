//import { useParams } from "react-router"
import { useParams } from "react-router"
import { Star } from "../../core/components/Star"
import { useBook } from "../hooks/useBooks"
import { GenreTag } from "./GenreTag"
import { Alert } from "../../core/components/Alert"
import { SkeletonBookPage } from "./SkeletonBookPage"

export const BookPage = () => {
  const { query } = useParams()
  const { title, author, year, isbn, publisher, description, imageUrl, genreid1, genreid2, genreid3, rating, pageCount, isLoading, error } = useBook({ bookId:query || "" })
  const genres = [genreid1, genreid2, genreid3].filter((id) => id != null && id !== 0);

  if(isLoading) return <SkeletonBookPage />

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
    <section className="bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 min-h-screen p-6 md:p-16">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-20">
        <div className="flex flex-col items-center justify-start gap-4">
          <div className="w-56 aspect-[3/4] shadow-xl rounded-lg overflow-hidden">
            <img
              src={`${imageUrl?.trim() ? imageUrl : "../../placeholder_img_book.png"}`}
              alt={`Portada`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-4">
            <a
              href={""}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Leer libro
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2 justify-center items-center text-center md:items-start md:justify-start md:text-left">
            <h1 className="text-4xl font-bold">{title}</h1>
            <p className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
              {author}
            </p>
            <div className="flex items-center gap-1">
              {[...Array(rating)].map((_, index) => (
                <Star
                  key={index}
                  style={`size-8 ${index < 4 ? 'text-yellow-500' : 'text-gray-300'}`}
                />
              ))}
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
    </section>
  )
}