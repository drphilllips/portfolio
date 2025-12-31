/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"


export default function useSyncHoverState(b: boolean) {
  const [isHovering, setIsHovering] = useState(b)
  const { pathname } = useLocation()

  useEffect(() => {
    setIsHovering(false)
  }, [pathname])

  return { isHovering, setIsHovering }
}
