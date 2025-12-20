// Button.tsx
import { useNavigate, useLocation } from "react-router-dom"
import type { LinkType } from "../content/schemas/link.schema"
import { useColorPalette } from "../features/painted-background/contexts/useColorPalette"
import Text from "./Text"
import { useSmoothScroll } from "../hooks/useSmoothScroll"

export default function Button({ href, label }: LinkType) {
  const { colorPalette } = useColorPalette()
  const { smoothScrollTo } = useSmoothScroll()
  const navigate = useNavigate()
  const location = useLocation()

  const bg = colorPalette.buttonColor
  const border = colorPalette.cardBorderColor
  const text = colorPalette.secondaryTextColor

  const onClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    // Only handle hash navigation
    const hashIndex = href.indexOf("#")
    if (hashIndex === -1) return

    const hash = href.slice(hashIndex) // "#taarcom"
    const id = hash.slice(1) // "taarcom"
    if (!id) return

    // If href includes a path (e.g. "/experience#taarcom") and you're not on it,
    // let the router navigate normally (or handle as a separate case).
    const pathPart = href.slice(0, hashIndex)
    if (pathPart && pathPart !== location.pathname) return

    e.preventDefault()

    const el = document.getElementById(id)
    if (!el) {
      // still update the hash so it can be retried after render if needed
      navigate({ hash }, { replace: true })
      return
    }

    const y =
      el.getBoundingClientRect().top +
      window.scrollY

    smoothScrollTo(y-96, 800) // 👈 slower & more relaxed

    // Update URL hash without causing a remount (your RouteTransitionOutlet ignores hash)
    navigate({ hash }, { replace: true })
  }

  return (
    <a
      href={href}
      aria-label={label}
      onClick={onClick}
      className={`inline-flex items-center justify-center px-4 py-2 border ${bg} ${border} ${text} rounded-md`}
    >
      <Text>{label}</Text>
    </a>
  )
}