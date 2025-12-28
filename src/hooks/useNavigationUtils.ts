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
      setTimeout(() => setIsFirstMount(false),0)
      return
    }

    const hasVisited = sessionStorage.getItem(HOME_VISITED_KEY) === "1"
    if (!hasVisited) {
      setTimeout(() => setIsFirstMount(true),0)
      sessionStorage.setItem(HOME_VISITED_KEY, "1")
    } else {
      setTimeout(() => setIsFirstMount(false),0)
    }
  }, [isOnHomePage])

  return { isOnHomePage, isFirstMount }
}