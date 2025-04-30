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
import { useEffect } from "react";
import { supabase } from "../core/supabase/supabaseClient.ts";
import { useAuthStore } from "../core/store/authStore.ts";
import { ProtectedRoute } from "./ProtectedRoute.tsx";

export const AppRouter = () => {
    const setUser = useAuthStore((state) => state.setUser)
    const logout = useAuthStore((state) => state.logout)

    // Comprobar si el usuario está logeado
    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user && session.user.id && session.user.email) {
                setUser({ id: session.user.id, email: session.user.email })
            } else {
                logout()
            }
        })

        return () => {
            listener.subscription.unsubscribe()
        }
    }, [setUser, logout])

    return (
        <Routes>
            {/* Ruta SIN layout */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Rutas CON layout compartido */}
            <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/search/:query" element={<BooksList />} />
                <Route path="/search/book/:query" element={<BookPage />} />
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
