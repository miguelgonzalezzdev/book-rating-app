import { useParams } from "react-router"

export const BookPage = () => {
  const { query } = useParams()

  return <h1>Libro: {query}</h1>
}