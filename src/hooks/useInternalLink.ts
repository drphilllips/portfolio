import { useNavigate } from "react-router-dom"
import { PAINT_BG_DURATION_MS, PAUSE_AFTER_PAINT_BG_MS } from "../features/paint-fg-transition/constants/canvasBackgroundTransition"
import { useSmoothScroll } from "./useSmoothScroll"
import type { InternalLinkType } from "../content/schemas/internal-link.schema"
import { useMemo } from "react"


export default function useInternalLink(internalLink?: InternalLinkType) {
  const href = useMemo(() => (
    `/${internalLink?.page}${internalLink?.sectionHash}`
  ), [internalLink])

  const { scrollToSection, setScrollY } = useSmoothScroll(href)
  const navigate = useNavigate()

  const navigateToPageSection = () => {
    if (!internalLink) return
    navigate(`/${internalLink.page}`)

    if (!href) return

    setTimeout(() => setScrollY(0), PAINT_BG_DURATION_MS + PAUSE_AFTER_PAINT_BG_MS - 50)

    setTimeout(() => scrollToSection(), PAINT_BG_DURATION_MS + PAUSE_AFTER_PAINT_BG_MS + 500)
  }

  return { navigateToPageSection }
}