import AppShell from "./components/routing/AppShell"
import ColorPalette from "./features/painted-background/ColorPalette"
import CanvasBackgroundTransition from "./features/painted-background/CanvasBackgroundTransition"
import RouteTransitionOutlet from "./components/routing/RouteTransitionOutlet"

export default function App() {
  return (
    <>
      {/* Always-on visuals */}
      <ColorPalette />
      <CanvasBackgroundTransition />

      <AppShell className="gap-6">
        {/* Pages content renders here */}
        <RouteTransitionOutlet />
      </AppShell>
    </>
  )
}