import { Routes, Route, Navigate } from "react-router";
import { HomePage } from "../home/components/HomePage.tsx";
import { SearchPage } from "../search/components/SearchPage.tsx";
import { ReviewPage } from "../review/components/ReviewPage.tsx";
import { ProfilePage } from "../profile/components/ProfilePage.tsx";
import { BookPage } from "../search/components/BookPage.tsx";
import { BooksList } from "../search/components/BooksList.tsx";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/search/:query" element={<BooksList />} />
            <Route path="/search/book/:query" element={<BookPage />} />
            <Route path="/review" element={<ReviewPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/*" element={<Navigate to='/' />} />
        </Routes>
    )
}
