import { useNavigate, useParams } from "react-router"
import { useGenre } from "../hooks/useGenre"
import { Loader } from "../../core/components/Loader"
import { useEffect } from "react"
import { Alert } from "../../core/components/Alert"

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
          className="w-full h-45 flex items-center justify-start shadow-lgz-0 [mask-image:linear-gradient(to_bottom,black,transparent)]"
          style={{ backgroundColor: color }}
        />
      </div>
      <div className="overflow-x-auto mx-6 relative z-10">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b border-neutral-300 dark:border-neutral-700">
              <th className="py-3 px-2 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                #
              </th>
              <th className="py-3 px-2 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                Título
              </th>
              <th className="py-3 px-2 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                Autor
              </th>
              <th className="py-3 px-2 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                Calificación
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-4 px-2 text-neutral-900 dark:text-neutral-50">
                <div className="w-16 aspect-[3/4]">
                  <img
                    src="../placeholder_img_book.png"
                    alt="Imagen del libro"
                    className="w-full h-full object-cover"
                  />
                </div>
              </td>
              <td className="py-4 px-2 text-neutral-900 dark:text-neutral-50">Libro 1</td>
              <td className="py-4 px-2 text-neutral-700 dark:text-neutral-300">Autor 1</td>
              <td className="py-4 px-2 text-neutral-700 dark:text-neutral-300">4.5</td>
            </tr>
            <tr >
              <td className="py-4 px-2 text-neutral-900 dark:text-neutral-50">
                <div className="w-16 aspect-[3/4]">
                  <img
                    src="../placeholder_img_book.png"
                    alt="Imagen del libro"
                    className="w-full h-full object-cover"
                  />
                </div>
              </td>
              <td className="py-4 px-2 text-neutral-900 dark:text-neutral-50">Libro 2</td>
              <td className="py-4 px-2 text-neutral-700 dark:text-neutral-300">Autor 2</td>
              <td className="py-4 px-2 text-neutral-700 dark:text-neutral-300">3.8</td>
            </tr>
            {/* Agregar más filas aquí */}
          </tbody>
        </table>
      </div>
    </section >
  )
}
/*
<ul className="grid gap-4 mx-6">
        <li
          className="bg-white dark:bg-neutral-600 rounded-2xl shadow p-4"
        >
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
            Titulo
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300">
            Autor
          </p>
        </li>
      </ul>
*/