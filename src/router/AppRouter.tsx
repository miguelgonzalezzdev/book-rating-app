import { Routes, Route, Navigate } from "react-router";
import { HomePage } from "../home/components/HomePage.tsx";
import { SearchPage } from "../search/components/SearchPage.tsx";
import { ReviewPage } from "../review/components/ReviewPage.tsx";
import { ProfilePage } from "../profile/components/ProfilePage.tsx";
import { BookPage } from "../search/components/BookPage.tsx";
import { BooksList } from "../search/components/BooksList.tsx";
import { LoginPage } from "../login/components/LoginPage.tsx";
import { MainLayout } from "../core/components/MainLayout.tsx";
import { RegisterPage } from "../register/components/RegisterPage.tsx";
 
export const AppRouter = () => {
    return (
        <Routes>
            {/* Ruta sin layout (login) */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Rutas con layout compartido */}
            <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/search/:query" element={<BooksList />} />
                <Route path="/search/book/:query" element={<BookPage />} />
                <Route path="/review" element={<ReviewPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Route>

            {/* Redirección por defecto */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}
