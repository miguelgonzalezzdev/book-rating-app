import { useParams } from "react-router"

export const BooksList = () => {
  const { query } = useParams()

  return <h1>Resultados de búsqueda para: {query}</h1>
}