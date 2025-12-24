import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"


export default function useSyncHoverState(b: boolean) {
  const [isHovering, setIsHovering] = useState(b)
  const { pathname } = useLocation()

  useEffect(() => {
    setTimeout(() => setIsHovering(false),0)
  }, [pathname])

  return { isHovering, setIsHovering }
}
