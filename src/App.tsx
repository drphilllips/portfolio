import AppShell from "./components/AppContent"
import { Outlet } from "react-router-dom"
import ColorPalette from "./features/painted-background/ColorPalette"
import CanvasBackgroundTransition from "./features/painted-background/CanvasBackgroundTransition"

export default function App() {
  return (
    <>
      {/* Always-on visuals */}
      <ColorPalette />
      <CanvasBackgroundTransition />

      <AppShell className="gap-6">
        {/* Pages content renders here */}
        <Outlet />
      </AppShell>
    </>
  )
}