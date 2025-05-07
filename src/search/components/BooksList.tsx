import { useNavigate, useParams } from "react-router"
import { useGenre } from "../hooks/useGenre"
import { Loader } from "../../core/components/Loader"
import { useEffect } from "react"
import { Alert } from "../../core/components/Alert"
import { BookListItem } from "./BookListItem"

export const BooksList = () => {
  const { query } = useParams()
  const genreIdNumber = Number(query)
  const { genre, color, isLoading, error } = useGenre({ genreId: genreIdNumber || 0 })
  const navigate = useNavigate()

  useEffect(() => {
    if (!genreIdNumber || genreIdNumber == 0) {
      navigate('/search')
    }
  }, [genreIdNumber, navigate])

  if (isLoading) return <Loader />

  if (error) {
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

  return (
    <section className="bg-neutral-50 dark:bg-neutral-800 min-h-screen">
      <div className="relative mb-6">
        <h1 className="absolute left-10 top-1/2 -translate-y-1/2 text-4xl font-bold text-neutral-900 dark:text-neutral-50 z-10">
          {genre}
        </h1>
        <div
          className="w-full h-55 flex items-center justify-start shadow-lgz-0 [mask-image:linear-gradient(to_bottom,black,transparent)]"
          style={{ backgroundColor: color }}
        />
      </div>
      <ul className="grid mx-6">
        <BookListItem title="Los tres cerditos" author="La vaca saturno" rating={4} />
        <BookListItem title="Mi picha en tu boquita" author="Naboman" rating={4} />
      </ul>
    </section >
  )
}
