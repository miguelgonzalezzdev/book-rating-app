import { useEffect, useState } from "react";
import { Book, BookId } from "../../core/types";
import { getBook, getBooksByGenre } from "../services/getBook";

interface UseBookProps {
    bookId: BookId;
}

export function useBook({ bookId }: UseBookProps) {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [year, setYear] = useState("");
    const [isbn, setIsbn] = useState("");
    const [publisher, setPublisher] = useState("");
    const [description, setDescription] = useState("");
    const [genreid1, setGenreid1] = useState(0);
    const [genreid2, setGenreid2] = useState(0);
    const [genreid3, setGenreid3] = useState(0);
    const [imageUrl, setImageUrl] = useState("");
    const [bookUrl, setBookUrl] = useState("");
    const [rating, setRating] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true)
        const fetchBooks = async () => {
            try {
                const data = await getBook({ bookId });
                setTitle(data.title);
                setAuthor(data.author);
                setYear(data.year);
                setIsbn(data.isbn);
                setPublisher(data.publisher);
                setDescription(data.description);
                setGenreid1(data.genreId1);
                setGenreid2(data.genreId2);
                setGenreid3(data.genreId3);
                setImageUrl(data.imageUrl);
                setBookUrl(data.bookUrl);
                setRating(data.rating);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBooks();
    }, [bookId]);

    return { title, author, year, isbn, publisher, description, genreid1, genreid2, genreid3, imageUrl, bookUrl, rating, isLoading, error };
}

interface UseAllBooksByGenreProps {
    genreId: BookId;
}

export function useAllBooksByGenre({ genreId }: UseAllBooksByGenreProps) {
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        const fetchBooksByGenre = async () => {
            try {
                const data = await getBooksByGenre({ genreId });
                setBooks(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBooksByGenre();
    }, [genreId]);

    return { books, isLoading, error };
}
