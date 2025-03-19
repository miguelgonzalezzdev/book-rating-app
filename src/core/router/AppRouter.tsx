import { Routes, Route, Navigate } from "react-router";
import { Home } from "../../home/Home";
import { Search } from "../../search/Search";
import { Review } from "../../review/Review";
import { Profile } from "../../profile/Profile";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/review" element={<Review />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/*" element={<Navigate to='/' />} />
        </Routes>
    )
}
