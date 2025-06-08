import { Navigate, Outlet } from 'react-router'
import { useAuthStore } from '../../core/store/authStore' 

export function AdminRoute() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const isAdmin = useAuthStore(state => state.isAdmin)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}