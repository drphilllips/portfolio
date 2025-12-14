import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ResponsiveDesignProvider } from './contexts/ResponsiveDesignContext.tsx'
import { ColorPaletteProvider } from './contexts/ColorPaletteContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ResponsiveDesignProvider>
    <ColorPaletteProvider>
      <App />
    </ColorPaletteProvider>
    </ResponsiveDesignProvider>
  </StrictMode>,
)
