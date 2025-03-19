import { Footer } from "./core/components/Footer"
import { Header } from "./core/components/Header"
import { AppRouter } from "./core/router/AppRouter"

function App() {
  return (
    <>
      <Header />
      <main>
        <AppRouter />
      </main>
      <Footer />
    </>
  )
}

export default App
