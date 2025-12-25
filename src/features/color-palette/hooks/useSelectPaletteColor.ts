import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react"
import type { PaletteItem } from "../../../types/colorPalette"
import { useColorPalette } from "../../../contexts/useColorPalette"
import { useLocation, useNavigate } from "react-router-dom"
import type { SitePage } from "../../../types/pages"
import { SELECT_PALETTE_COLOR_COOL_DOWN_MS } from "../constants/colorPalette"
import { useSmoothScroll } from "../../../hooks/useSmoothScroll"
import useLayeredClick from "../../../hooks/useLayeredClick"


export default function useSelectPaletteColor(
  items: PaletteItem[],
  setItems: Dispatch<SetStateAction<PaletteItem[]>>,
  isOpen: boolean,
  setIsOpen: (_: boolean) => void,
) {
  const { requestPaletteChange } = useColorPalette()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { smoothScrollTo, atTopOfPage } = useSmoothScroll()
  const { clickThrough } = useLayeredClick()

  const [isCooldown, setIsCooldown] = useState(false)
  const cooldownTimerRef = useRef<number | null>(null)

  // handle board click
  const handleBoardClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (atTopOfPage) {
      if (isCooldown && !isOpen) return
      if (isOpen && !isCooldown) {
        clickThrough(e as React.MouseEvent)
      }
      if (!isOpen) {
        setIsOpen(true)
        setIsCooldown(true)
        setTimeout(() => setIsCooldown(false), 500)
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
    const pathItem = items.find(item => item.page === sitePage)
    const pathItemIndex = pathItem ? items.indexOf(pathItem) : null
    if (pathItem && pathItemIndex !== 0) {
      setTimeout(() => reorderPalette(setItems, pathItem),0)
    }
  }, [pathname, items, setItems])

  function handleSelectPaletteColor(item: PaletteItem, itemIndex: number) {
    if (!isOpen) return
    if (isCooldown) return
    if (itemIndex !== 0) {
      reorderPalette(setItems, item)
      requestPaletteChange(item.componentColors)
      startCooldown(cooldownTimerRef, setIsCooldown, SELECT_PALETTE_COLOR_COOL_DOWN_MS)
      navigate(`/${item.page}`)
    }
    setIsOpen(false)
  }

  return { isCooldown, handleSelectPaletteColor, handleBoardClick }
}

function startCooldown (
  cooldownTimerRef: React.RefObject<number | null>,
  setIsCooldown: (_: boolean) => void,
  ms: number,
) {
  setIsCooldown(true)
  if (cooldownTimerRef.current !== null) {
    window.clearTimeout(cooldownTimerRef.current)
  }
  cooldownTimerRef.current = window.setTimeout(() => {
    cooldownTimerRef.current = null
    setIsCooldown(false)
  }, ms)
}

function reorderPalette(
  setItems: Dispatch<SetStateAction<PaletteItem[]>>,
  firstItem: PaletteItem
) {
  setItems(prev => {
    const restOfItems = prev.filter(item => item.color !== firstItem.color)
    return [firstItem, ...restOfItems]
  })
}