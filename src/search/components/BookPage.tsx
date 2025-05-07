//import { useParams } from "react-router"
import { Star } from "../../core/components/Star"

export const BookPage = () => {
  //const { query } = useParams()

  const imageUrl = ""
  const genres = ["genero", "genero", "genero"]

  return (
    <section className="bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 min-h-screen p-6 md:p-10">
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

        <div className="flex flex-col gap-6">
          <div className="text-sm space-y-2">
            <h1 className="text-5xl font-bold">{"Title"}</h1>
            <p className="text-2xl font-semibold text-neutral-700 dark:text-neutral-300">
              {"Author"} · {"year"}
            </p>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                style={`size-8 ${index < 4 ? 'text-yellow-500' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <div className="text-lg space-y-1">
            <p>
              <span className="font-semibold">Géneros:</span>{" "}
              {genres.map((id) => (
                <span key={id} className="inline-block mx-1 px-2 py-1 bg-neutral-200 dark:bg-neutral-700 rounded text-xs">
                  {id}
                </span>
              ))}
            </p>
            <p>
              <span className="font-semibold">Editorial:</span> {"publisher"}
            </p>
            <p>
              <span className="font-semibold">ISBN:</span> {"isbn"}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Descripción</h2>
            <p className="max-w-lg text-lg text-neutral-700 dark:text-neutral-300 whitespace-pre-line break-words">{"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}</p>
          </div>
        </div>
      </div>
    </section>
  )
}