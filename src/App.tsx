import { AppRouter } from "./router/components/AppRouter"
import { useAuthListener } from "./core/hooks/useAuthListener"
import { Toaster } from 'react-hot-toast';

function App() {
  useAuthListener()
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  return (
    <>
      <AppRouter />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: isDark ? "#525252" : "#ffffff", 
            color: isDark ? "#fafafa" : "#171717",     
            border: "1px solid",
            borderColor: isDark ? "#404040" : "#e5e7eb", 
          },
          duration: 3000,
        }}
      />
    </>
  )
}

export default App
