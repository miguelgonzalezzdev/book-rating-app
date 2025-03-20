import { Footer } from "./core/components/Footer"
import { Header } from "./core/components/Header"
import { AppRouter } from "./router/AppRouter"

function App() {
  return (
    <>
      <Header />
      <AppRouter />
      <Footer />
    </>
  )
}

export default App
