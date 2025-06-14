import toast from "react-hot-toast"
import { FormButton } from "../../core/components/FormButton"
import { FormInputField } from "../../core/components/FormInputField"
import { FormLabel } from "../../core/components/FormLabel"
import { MultipleGenreSelector } from "../../core/components/MultipleGenreSelector"
import { useGenresSelector } from "../../core/hooks/useGenresSelector"
import { PhotoPlusIcon } from "../../core/icons/PhotoPlusIcon"
import { usePublishBook } from "../hooks/usePublishBook"
import { Loader } from "../../core/components/Loader"

export function PublishBookPage() {
    const {
        title,
        author,
        year,
        isbn,
        publisher,
        pages,
        description,
        selectedGenres,
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
        handleGenreChange,
        handleImageSelected,
        handleBookFile,
        handleSubmitBook
    } = usePublishBook()
    const { genres, error: errorGenres, isLoading: isLoadingGenres } = useGenresSelector()

    if (errorGenres) {
        toast.error("Error al obtener los géneros.");
    }

    if (error && error!=="") {
        toast.error(error);
    }

    if (isLoading) {
        return (
            <Loader />
        )
    }

    return (
        <div className="min-h-screen w-full bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 flex items-center justify-start flex-col gap-10 px-4 py-10">
            <section className="w-full max-w-2xl bg-white dark:bg-neutral-600 rounded-2xl p-6 md:p-10 space-y-6 shadow-lg border border-gray-200 dark:border-neutral-700">
                <h1 className="text-2xl md:text-3xl text-center font-semibold">Publicar libro</h1>
                <form onSubmit={handleSubmitBook} className="space-y-6">

                    {imageUrl && (
                        <div className="w-full flex justify-center">
                            <label htmlFor="inputImage" className="w-24 md:w-42 aspect-[3/4] overflow-hidden cursor-pointer flex items-center justify-center">
                                <img
                                    src={imageUrl?.trim() ? imageUrl : "../placeholder_img_book.webp"}
                                    alt="Imagen del libro"
                                    className="w-full h-full object-cover"
                                />
                                <input
                                    id='inputImage'
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageSelected}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    )}

                    {!imageUrl && (
                        <div className="w-full flex justify-center">
                            <label htmlFor="inputImage" className={`w-24 md:w-42 aspect-[3/4] flex items-center justify-center border-2 border-dashed rounded-md cursor-pointer ${error && !imageUrl ? 'border-red-600' : 'border-neutral-400'}`}>
                                <PhotoPlusIcon width={42} height={42} className={`${error && !imageUrl ? 'text-red-600 ml-1' : 'text-neutral-400 ml-1'}`} />
                                <input
                                    id='inputImage'
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageSelected}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    )}

                    <div>
                        <FormLabel text="Título" htmlFor="title" error={!!(error && title === "")}/>
                        <FormInputField
                            id="title"
                            name="title"
                            type="text"
                            placeholder="Título"
                            value={title}
                            onChange={handleTitle}
                            error={!!(error && title === "")}
                        />
                    </div>
                    <div>
                        <FormLabel text="Autor" htmlFor="author" error={!!(error && author === "")}/>
                        <FormInputField
                            id="author"
                            name="author"
                            type="text"
                            placeholder="Autor"
                            value={author}
                            onChange={handleAuthor}
                            error={!!(error && author === "")}
                        />
                    </div>
                    <div>
                        <FormLabel text="Año publicación" htmlFor="year" error={!!(error && year === 0)}/>
                        <FormInputField
                            id="year"
                            name="year"
                            type="number"
                            placeholder="2025"
                            value={year?.toString() ?? ""}
                            onChange={handleYear}
                            error={!!(error && year === 0)}
                        />
                    </div>
                    <div>
                        <FormLabel text="Editorial" htmlFor="publisher" />
                        <FormInputField
                            id="publisher"
                            name="publisher"
                            type="text"
                            placeholder="Editorial"
                            value={publisher}
                            onChange={handlePublisher}
                            error={!!(error && publisher === "")}
                        />
                    </div>
                    <div>
                        <FormLabel text="ISBN" htmlFor="isbn" />
                        <FormInputField
                            id="isbn"
                            name="isbn"
                            type="text"
                            placeholder="ISBN"
                            value={isbn}
                            onChange={handleIsbn}
                            error={!!(error && isbn === "")}
                        />
                    </div>
                    <div>
                        <FormLabel text="Páginas" htmlFor="pages" error={!!(error && pages === 0)}/>
                        <FormInputField
                            id="pages"
                            name="pages"
                            type="number"
                            placeholder="0"
                            value={pages?.toString() ?? ""}
                            onChange={handlePages}
                            error={!!(error && pages === 0)}
                        />
                    </div>
                    {isLoadingGenres ? (
                        <>
                            {[...Array(3)].map((_, index) => (
                                <div key={index}>
                                    <div  className="w-20 h-4 bg-neutral-200 dark:bg-neutral-700 rounded mb-1 animate-pulse"></div>
                                    <div className="w-full px-4 py-3 rounded-lg bg-neutral-200 dark:bg-neutral-700 animate-pulse">
                                        <div className="h-7 bg-neutral-300 dark:bg-neutral-600 rounded"></div>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <MultipleGenreSelector
                            selectedGenres={selectedGenres}
                            onChange={handleGenreChange}
                            allGenres={genres}
                        />
                    )}
                    <div>
                        <FormLabel text="Sinopsis " htmlFor="description" error={!!(error && description === "")}/>
                        <textarea
                            id="description"
                            value={description}
                            onChange={handleDescription}
                            className="w-full px-4 py-3 rounded-lg min-h-30 sm:min-h-40 md:min-h-50 bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-50 placeholder-gray-400 dark:placeholder-neutral-400 focus:outline-none border border-neutral-300 dark:border-transparent"
                            placeholder="Breve resumen del libro..."
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <FormLabel text="Archivo del libro" htmlFor="bookFile" error={!!(error && !bookFile)}/>
                        <label htmlFor="bookFile" className="flex items-center justify-between gap-3 bg-neutral-200 dark:bg-neutral-700 px-4 py-3 rounded-lg cursor-pointer hover:bg-neutral-300 dark:hover:bg-neutral-800 transition-colors border border-neutral-300 dark:border-transparent">
                            <span className="text-sm text-neutral-700 dark:text-neutral-200">
                                {bookFile?.name || "Selecciona un archivo PDF o imagen"}
                            </span>
                            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                                Seleccionar
                            </span>
                            <input
                                id="bookFile"
                                name="bookFile"
                                type="file"
                                accept=".pdf, image/*"
                                onChange={handleBookFile}
                                className="hidden"
                            />
                        </label>
                        <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-1">Formatos permitidos: PDF o imagen (JPG, PNG, etc.)</p>
                    </div>
                    {error && (
                        <p className="text-red-500 text-md text-center">{error}</p>
                    )}
                    <FormButton text="Enviar solicitud" />
                </form>
            </section>
        </div>
    )
}