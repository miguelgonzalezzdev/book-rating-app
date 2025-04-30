
import { Navigate, Outlet } from 'react-router'
import { useAuthStore } from '../../core/store/authStore' 

export const PublicOnlyRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
