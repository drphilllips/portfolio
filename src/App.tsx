import AppShell from "./components/basic/AppShell"
import CanvasBackgroundTransition from "./features/paint-fg-transition/CanvasBackgroundTransition"
import RouteTransitionOutlet from "./features/paint-fg-transition/RouteTransitionOutlet"
import ColorPalette from "./features/color-palette/ColorPalette"

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