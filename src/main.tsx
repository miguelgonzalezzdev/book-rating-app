import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router";
import App from './App.tsx'
import { ScrollToTop } from './core/components/ScrollToTop.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ScrollToTop />
    <App />
  </BrowserRouter>,
)
