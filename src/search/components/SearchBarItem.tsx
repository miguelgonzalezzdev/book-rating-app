import { useNavigate } from "react-router";
import { BookAuthor, BookId, BookImageUrl, BookTitle } from "../../core/types";

interface SearchBarItemProps {
    bookId: BookId;
    title: BookTitle;
    author: BookAuthor;
    imageUrl: BookImageUrl
}

export function SearchBarItem({ bookId, title, author, imageUrl }: SearchBarItemProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/search/book/${bookId}`);
    }

    return (
        <li onClick={handleClick} className="p-3 hover:bg-neutral-100 dark:hover:bg-neutral-600 cursor-pointer flex justify-start items-center gap-3">
            <div className="w-8 aspect-[3/4] overflow-hidden">
                <img
                    src={`${imageUrl?.trim() ? imageUrl : "../placeholder_img_book.png"}?t=${Date.now()}`}
                    alt="Imagen del libro"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex flex-col text-start w-full">
                <p className="text-md truncate">{title}</p>
                <p className="text-sm  text-neutral-700 dark:text-neutral-300">{author}</p>
            </div>
        </li>
    )
}
