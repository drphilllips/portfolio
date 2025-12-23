import { useColorPalette } from "../../features/painted-background/contexts/useColorPalette"
import { useResponsiveDesign } from "../../contexts/useResponsiveDesign"
import View from "../basic/View"

type AppShellProps = {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

/**
 * AppShell
 * ----
 * A high-level layout wrapper that represents a full application page or screen.
 *
 * `AppShell` is responsible for applying global, page-scoped styling such as
 * background color, text color, and base layout behavior. It integrates with
 * the app’s color system via `useColorPalette` to ensure consistent theming
 * and smooth transitions between color states.
 *
 * Internally, `AppShell` is built on top of the `View` primitive and intentionally
 * keeps its API small, delegating most layout and styling control to props.
 *
 * Props:
 * - `children?` (ReactNode)
 *   Optional content to be rendered within the page.
 *   This typically includes layout containers, text, and interactive elements.
 *
 * - `className?` (string)
 *   Optional Tailwind / CSS classes appended to the base page styles.
 *   Use this to customize layout, spacing, or alignment on a per-page basis
 *   without redefining global page behavior.
 *
 * - `style?` (CSSProperties)
 *   Optional inline styles applied to the root page container.
 *
 * Behavior:
 * - Applies `min-h-dvh` and `w-dvw` to ensure the page fills the viewport safely.
 * - Also using `px-12` when on landscape mode in mobile devices for
 *   final assurance of safe area insets.
 * - Applies background and text color from `useColorPalette`.
 * - Adds smooth color transitions via `transition-colors`.
 * - Centers content by default using flexbox.
 *
 * Design notes:
 * - `AppShell` sets inherited properties such as text color intentionally,
 *   allowing child components (e.g., `Text`) to inherit color naturally.
 * - This component should generally be used once per route or screen.
 * - Any global page-level concerns (theming, safe-area handling, etc.)
 *   are appropriate to introduce here.
 */
export default function AppShell({
  children,
  className="",
  style,
}: AppShellProps) {
  const { onMobileSideways } = useResponsiveDesign()
  const { pageColors } = useColorPalette()

  return (
    <View
      className={`
        min-h-dvh w-dvw overflow-y-auto scroll-smooth
        ${onMobileSideways && "px-12"}
        ${pageColors.bg} ${pageColors.title}
        flex flex-col items-center justify-center text-center
        ${className}
      `}
      style={style}
    >
      <View className="relative isolate z-0">
        {children}
      </View>
    </View>
  )
}