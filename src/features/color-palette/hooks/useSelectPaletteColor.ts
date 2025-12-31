import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react"
import type { PaletteItem } from "../../../types/colorPalette"
import { useColorPalette } from "../../../contexts/useColorPalette"
import { useLocation, useNavigate } from "react-router-dom"
import { SELECT_PALETTE_COLOR_COOL_DOWN_MS } from "../constants/colorPalette"
import { useSmoothScroll } from "../../../hooks/useSmoothScroll"
import useLayeredClick from "../../../hooks/useLayeredClick"
import type { SitePage } from "../../../content/schemas/site-page.schema"
import { PALETTE_ITEMS } from "../../../styles/colorPalette"


export default function useSelectPaletteColor() {
  const { requestPaletteChange } = useColorPalette()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { smoothScrollTo, atTopOfPage } = useSmoothScroll()
  const { clickThrough } = useLayeredClick()

  const [paletteItems, setPaletteItems] = useState<PaletteItem[]>(PALETTE_ITEMS)
  const [isPaletteOpen, setIsPaletteOpen] = useState(false)

  const [isPaletteCooldown, setIsPaletteCooldown] = useState(false)
  const cooldownTimerRef = useRef<number | null>(null)

  // handle board click
  const handleBoardClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (atTopOfPage) {
      if (isPaletteCooldown && !isPaletteOpen) return
      if (isPaletteOpen && !isPaletteCooldown) {
        clickThrough(e as React.MouseEvent)
      }
      if (!isPaletteOpen) {
        setIsPaletteOpen(true)
        setIsPaletteCooldown(true)
        setTimeout(() => setIsPaletteCooldown(false), 500)
      }
    } else {
      smoothScrollTo(0)
    }
  }

  useEffect(() => {
    const timerId = cooldownTimerRef.current

    return () => {
      if (timerId !== null) {
        window.clearTimeout(timerId)
      }
    }
  }, [])

  useEffect(() => {
    const sitePage = pathname.split("/")[1] as SitePage
    const pathItem = paletteItems.find(item => item.page === sitePage)
    const pathItemIndex = pathItem ? paletteItems.indexOf(pathItem) : null
    if (pathItem && pathItemIndex !== 0) {
      setTimeout(() => reorderPaletteItems(setPaletteItems, pathItem),0)
    }
  }, [pathname, paletteItems, setPaletteItems])

  function handleSelectPaletteColor(item: PaletteItem, itemIndex: number) {
    if (!isPaletteOpen) return
    if (isPaletteCooldown) return
    if (itemIndex !== 0) {
      reorderPaletteItems(setPaletteItems, item)
      requestPaletteChange(item.componentColors)
      startPaletteCooldown(cooldownTimerRef, setIsPaletteCooldown, SELECT_PALETTE_COLOR_COOL_DOWN_MS)
      navigate(`/${item.page}`)
    }
    setIsPaletteOpen(false)
  }

  return { paletteItems, isPaletteOpen, setIsPaletteOpen, isPaletteCooldown, handleSelectPaletteColor, handleBoardClick }
}

function startPaletteCooldown (
  cooldownTimerRef: React.RefObject<number | null>,
  setIsPaletteCooldown: (_: boolean) => void,
  ms: number,
) {
  setIsPaletteCooldown(true)
  if (cooldownTimerRef.current !== null) {
    window.clearTimeout(cooldownTimerRef.current)
  }
  cooldownTimerRef.current = window.setTimeout(() => {
    cooldownTimerRef.current = null
    setIsPaletteCooldown(false)
  }, ms)
}

function reorderPaletteItems(
  setPaletteItems: Dispatch<SetStateAction<PaletteItem[]>>,
  firstPaletteItem: PaletteItem
) {
  setPaletteItems(prev => {
    const restOfItems = prev.filter(item => item.color !== firstPaletteItem.color)
    return [firstPaletteItem, ...restOfItems]
  })
}