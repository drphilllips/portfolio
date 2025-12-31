/* eslint-disable react-hooks/set-state-in-effect */
import { useMemo, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { HOME_VISITED_KEY } from "../constants/routeTransition";


export default function useNavigationUtils() {
  const { pathname } = useLocation()

  const isOnHomePage = useMemo(() => (
    pathname === "/"
  ), [pathname])

  const [isFirstMount, setIsFirstMount] = useState(false)

  useEffect(() => {
    if (!isOnHomePage) {
      setIsFirstMount(false)
      return
    }

    const hasVisited = sessionStorage.getItem(HOME_VISITED_KEY) === "1"
    if (!hasVisited) {
      setIsFirstMount(true)
      sessionStorage.setItem(HOME_VISITED_KEY, "1")
    } else {
      setIsFirstMount(false)
    }
  }, [isOnHomePage])

  return { isOnHomePage, isFirstMount }
}