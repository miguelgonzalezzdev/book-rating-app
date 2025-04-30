import { AppRouter } from "./router/components/AppRouter"
import { useAuthListener } from "./core/hooks/useAuthListener" 

function App() {
  useAuthListener()
  
  return (
    <>
      <AppRouter />
    </>
  )
}

export default App
