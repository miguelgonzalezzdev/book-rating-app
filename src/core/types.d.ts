import { ALERT_TYPES } from "./constants"

//***** Tipos para USER *****//
export interface User {
    id: string
    email: string
}
export type UserId = User["id"]
export type UserName = User["name"]
//***** END Tipos para GENRES *****//

//***** START Tipos para GENRES *****//
export interface Genre {
    id: number
    name: string
    color: string
}
export type ListOfGenres = Genre[]
export type GenreId = Genre["id"]
export type GenreName = Genre["name"]
export type GenreColor = Genre["color"]
//***** END Tipos para GENRES *****//

//***** START Tipos para BOOK *****//
export interface BookDetails {
    id: string
    title: string;
    author: string;
    year: string;
    isbn: string;
    publisher: string;
    description: string;
    genreId1: number;
    genreId2: number;
    genreId3: number;
    imageUrl: string;
    bookUrl: string;
    rating: number;
    page_count: number;
}
export interface Book {
    id: BookId;
    title: BookTitle;
    author: BookAuthor;
    rating: BookRating;
    imageUrl: BookImageUrl;
}

export type ListOfBooks = Book[]
export type BookId = Book["id"]
export type BookTitle = Book["title"]
export type BookAuthor = Book["author"]
export type BookImageUrl = Book["imageUrl"]
export type BookRating = Book["rating"]
//***** END Tipos para GENRES *****//

export type AlertType = typeof ALERT_TYPES[keyof typeof ALERT_TYPES];
