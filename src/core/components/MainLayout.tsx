import { Outlet } from 'react-router'
import { Footer } from "./Footer"
import { Header } from "./Header"

export function MainLayout() {
  return (
    <>
      <Header />
        <main className="min-h-screen">
            <Outlet /> {/* Aquí se renderizan las rutas hijas */}
        </main>
      <Footer />
    </>
  )
}
