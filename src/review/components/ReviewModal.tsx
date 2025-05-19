import { FormLabel } from '../../core/components/FormLabel';
import { FormInputField } from '../../core/components/FormInputField';
import { StarRating } from '../../core/components/StarRating';
import { PhotoPlusIcon } from '../../core/icons/PhotoPlusIcon';
import { useReview } from '../hooks/useReview';
import { ReviewModalSkeleton } from './ReviewModalSkeleton';
import { toast } from 'react-hot-toast';
import { Loader } from '../../core/components/Loader';

interface ConfirmModalProps {
    isOpen: boolean;
    bookId?: string;
    onClose: () => void;
}

export function ReviewModal({ isOpen, bookId = "", onClose }: ConfirmModalProps) {
    const { bookName, authorName, rating, setRating, reviewText, imageUrl, isFetching, isLoading, error, handleBookName, handleAuthorName, handleReviewText, handleImageSelected, handleSubmitReview } = useReview({ bookId })

    if (!isOpen) return null

    if (isFetching) return <ReviewModalSkeleton />

    if (error!="") {
        toast.error('Error al registrar la reseña');
    }

    if(isLoading) return <Loader />

    return (
        <div className={`mt-12 fixed inset-0 backdrop-brightness-35 backdrop-blur-xs flex items-center justify-center z-50 px-2 ${!isOpen ? 'hidden' : ''}`}>
            <div className="w-full max-w-lg bg-white dark:bg-neutral-600 rounded-2xl p-4 md:p-6 shadow-lg border border-gray-200 dark:border-neutral-700">
                <div className="space-y-4 md:space-y-6">
                    <div className="w-full flex items-center md:items-stretch justify-center flex-col md:flex-row gap-2 md:gap-6">
                        {bookId && (
                            <div className='flex items-center flex-col gap-4 md:gap-6'>
                                <div className="flex items-center flex-col">
                                    <p className="text-xl font-medium">{bookName}</p>
                                    <p className="text-lg text-neutral-700 dark:text-neutral-300">{authorName}</p>
                                </div>
                                <div className="w-24 md:w-30 aspect-[3/4] overflow-hidden">
                                    <img
                                        src={`${imageUrl?.trim() ? imageUrl : "../placeholder_img_book.webp"}?t=${Date.now()}`}
                                        alt="Imagen del libro"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        )}

                        {imageUrl && !bookId && (
                            <label htmlFor="inputImage" className="w-24 md:w-42 aspect-[3/4] overflow-hidden cursor-pointer">
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
                        )}

                        {!imageUrl && !bookId && (
                            <label htmlFor="inputImage" className="w-24 md:w-42 aspect-[3/4] flex items-center justify-center border-2 border-dashed border-neutral-400 rounded-md cursor-pointer">
                                <PhotoPlusIcon width={42} height={42} className="text-neutral-400 ml-1" />
                                <input
                                    id='inputImage'
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageSelected}
                                    className="hidden"
                                />
                            </label>
                        )}

                        {!bookId && (
                            <div className="w-full flex flex-col justify-between space-y-4">
                                <div className="flex flex-col">
                                    <FormLabel text="Título" htmlFor="bookName" />
                                    <FormInputField
                                        id="bookName"
                                        name="bookName"
                                        type="text"
                                        placeholder="Ej: Don Quijote de la Mancha"
                                        value={bookName}
                                        onChange={handleBookName}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <FormLabel text="Autor" htmlFor="authorName" />
                                    <FormInputField
                                        id="authorName"
                                        name="authorName"
                                        type="text"
                                        placeholder="Ej: Miguel de Cervantes"
                                        value={authorName}
                                        onChange={handleAuthorName}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <div className='px-4 py-3 flex items-center justify-center flex-col gap-1'>
                            <FormLabel text="Calificación" />
                            <StarRating initialRating={rating} onChange={setRating} />
                        </div>
                    </div>

                    <div>
                        <FormLabel text="Reseña" htmlFor="reviewText" />
                        <textarea
                            id="reviewText"
                            value={reviewText}
                            onChange={handleReviewText}
                            className="w-full px-4 py-3 rounded-lg min-h-30 sm:min-h-40 md:min-h-50 bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-50 placeholder-gray-400 dark:placeholder-neutral-400 focus:outline-none border border-neutral-300 dark:border-transparent"
                            placeholder="Escribe tu reseña aquí..."
                        />
                    </div>
                    {error && (
                        <p className="text-red-500 text-md text-center">{error}</p>
                    )}
                    <div className="flex items-center justify-center gap-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-50 hover:bg-neutral-300 dark:hover:bg-neutral-500 transition font-semibold">
                            Cancelar
                        </button>
                        <button type="button" onClick={handleSubmitReview} className="px-4 py-2 rounded-lg bg-blue-600 text-white dark:bg-blue-700 font-semibold">
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
