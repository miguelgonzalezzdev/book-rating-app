import { ALERT_TYPES } from "./constants"

//***** Tipos para USER *****//
export interface User {
    id: string
    email: string
    isAdmin?: boolean;
}
export type UserId = User["id"]
export type UserName = User["name"]
//***** END Tipos para GENRES *****//

//***** START Tipos para GENRES *****//
export interface Genre {
    id: number
    name: string
    color: string
    icon: string
}
export type ListOfGenres = Genre[]
export type GenreId = Genre["id"]
export type GenreName = Genre["name"]
export type GenreColor = Genre["color"]
export type GenreIcon = Genre["icon"]
//***** END Tipos para GENRES *****//

//***** START Tipos para BOOK *****//
export interface BookDetails {
    id: string
    title: string
    author: string
    year: string
    isbn: string
    publisher: string
    description: string
    genreId1: number
    genreId2: number
    genreId3: number
    imageUrl: string
    bookUrl: string
    rating: number
    page_count: number
}
export interface Book {
    id: BookId
    title: BookTitle
    author: BookAuthor
    rating: BookRating
    imageUrl: BookImageUrl
}

export type ListOfBooks = Book[]
export type BookId = BookDetails["id"]
export type BookTitle = BookDetails["title"]
export type BookAuthor = BookDetails["author"]
export type BookImageUrl = BookDetails["imageUrl"]
export type BookRating = BookDetails["rating"]
//***** END Tipos para GENRES *****//

//***** START Tipos para REVIEW *****//
export interface Review {
    id: string
    user_id: string
    username: string
    book_id: string | null
    rating: number
    text: string
    title: string
    author: string
    likes: number
    imageurl: string
    updated_at: string
}
export type ListOfReviews = Review[]
export type ReviewId = Review["id"]
//***** END Tipos para REVIEW *****//

//***** START Tipos para COMMENT *****//
export interface Comment {
    id: string
    review_id: ReviewId
    user_id: UserId
    username: string
    text: string
    created_at: string
    updated_at: string
}
export type ListOfComments = Comment[]
export type CommentId = Comment["id"]
//***** END Tipos para COMMENT *****//

//***** START Tipos para HISTORIC *****//
export interface Historic {
    id: string
    action_type_id: number
    created_at: string
    user_id: UserId
    target_id: string
    review_id: ReviewId
    profiles: {
        id: UserId
        name: string
        surname: string
        profileimage: string
    } | null
    reviews: {
        id: string
        user_id: UserId
        book_id: BookId
        author: string
        title: string
        text: string
        imageurl: string
    } | null
}
export type ListOfHistoric = Historic[]
export type HistoricId = Historic["id"]
//***** END Tipos para COMMENT *****//

export type AlertType = typeof ALERT_TYPES[keyof typeof ALERT_TYPES]

export interface IconComponentProps {
    width?: number
    height?: number
    className?: string
}
