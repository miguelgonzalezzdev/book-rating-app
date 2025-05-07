import { useNavigate } from "react-router";
import { Star } from "../../core/components/Star";
import { BookAuthor, BookId, BookImageUrl, BookRating, BookTitle } from "../../core/types";

interface BookListItemProps {
    bookId: BookId;
    title: BookTitle;
    author: BookAuthor;
    rating: BookRating;
    imageUrl?: BookImageUrl;
}

export function BookListItem({ bookId, title, author, rating, imageUrl }: BookListItemProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/search/book/${bookId}`);
    }

    return (
        <li onClick={handleClick} className="flex justify-start gap-6 p-4 border-b border-neutral-300 dark:border-neutral-700 cursor-pointer hover:bg-neutral-200 hover:dark:bg-neutral-700">
            <div className="w-12 md:w-16 aspect-[3/4] overflow-hidden">
                <img
                    src={`${imageUrl?.trim() ? imageUrl : "../placeholder_img_book.png"}?t=${Date.now()}`}
                    alt="Imagen del libro"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex justify-start flex-col">
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                    {title}
                </h2>
                <p className="text-md semibold text-neutral-700 dark:text-neutral-300">
                    {author}
                </p>
                <p className="mt-2 flex justify-start">
                    {[...Array(5)].map((_, index) => (
                        <Star
                            key={index}
                            style={`size-5 ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
                        />
                    ))}
                </p>
            </div>
        </li>
    )
}
