import { useNavigate } from "react-router-dom"
import { PAINT_BG_DURATION_MS, PAUSE_AFTER_PAINT_BG_MS } from "../features/paint-fg-transition/constants/canvasBackgroundTransition"
import { useSmoothScroll } from "./useSmoothScroll"


export default function useInternalLink(href?: string) {
  const { scrollToSection } = useSmoothScroll(href)
  const navigate = useNavigate()

  const navigateToPageSection = () => {
    if (!href) return

    const page = href.split("#")[0]

    navigate(`${page}`)

    setTimeout(() => {
      scrollToSection()
    }, PAINT_BG_DURATION_MS + PAUSE_AFTER_PAINT_BG_MS + 500)
  }

  return { navigateToPageSection }
}