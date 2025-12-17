import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ResponsiveDesignProvider } from './contexts/ResponsiveDesignContext.tsx'
import HomePage from './pages/HomePage.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AboutPage from './pages/AboutPage.tsx'
import ProjectsPage from './pages/ProjectsPage.tsx'
import ExperiencePage from './pages/ExperiencePage.tsx'
import ServicesPage from './pages/ServicesPage.tsx'
import ContactPage from './pages/ContactPage.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import { ColorPaletteProvider } from './features/painted-background/contexts/ColorPaletteContext.tsx'

const router = createBrowserRouter([
  {
    element: (
      <ResponsiveDesignProvider>
        <ColorPaletteProvider>
          <App />
        </ColorPaletteProvider>
      </ResponsiveDesignProvider>
    ),
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/projects", element: <ProjectsPage /> },
      { path: "/experience", element: <ExperiencePage /> },
      { path: "/services", element: <ServicesPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
