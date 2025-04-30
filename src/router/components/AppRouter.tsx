import { Routes, Route, Navigate } from "react-router"
import { HomePage } from "../../home/components/HomePage.tsx"
import { SearchPage } from "../../search/components/SearchPage.tsx"
import { ReviewPage } from "../../review/components/ReviewPage.tsx"
import { ProfilePage } from "../../profile/components/ProfilePage.tsx"
import { BookPage } from "../../search/components/BookPage.tsx"
import { BooksList } from "../../search/components/BooksList.tsx"
import { LoginPage } from "../../login/components/LoginPage.tsx"
import { MainLayout } from "../../core/components/MainLayout.tsx"
import { RegisterPage } from "../../register/components/RegisterPage.tsx"
import { ProtectedRoute } from "./ProtectedRoute.tsx"
import { PublicOnlyRoute } from "./PublicOnlyRoute.tsx"

export const AppRouter = () => {
    
    return (
        <Routes>
            {/* Rutas solo visibles sin estar logeado */}
            <Route element={<PublicOnlyRoute />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>

            {/* Rutas CON layout compartido */}
            <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/search/:query" element={<BooksList />} />
                <Route path="/search/book/:query" element={<BookPage />} />
                {/* Rutas solo visibles al estar logeado */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/review" element={<ReviewPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Route>
            </Route>

            {/* Redirección por defecto */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}
