import { Routes, Route, Navigate } from "react-router";
import { HomePage } from "../home/HomePage";
import { SearchPage } from "../search/SearchPage";
import { ReviewPage } from "../review/ReviewPage";
import { ProfilePage } from "../profile/ProfilePage";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/review" element={<ReviewPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/*" element={<Navigate to='/' />} />
        </Routes>
    )
}
