import { Navigate, Outlet } from 'react-router'
import { useAuthStore } from '../core/store/authStore' 

export const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}