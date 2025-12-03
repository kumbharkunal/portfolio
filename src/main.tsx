import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { ThemeProvider } from './context/ThemeContext';
import { LenisProvider } from './context/LenisContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LenisProvider>
        <App />
      </LenisProvider>
    </ThemeProvider>
  </StrictMode>,
)
