import { useCallback, useEffect } from "react";

export default function useScrollLocking(condition?: boolean) {

  const lockScrolling = useCallback(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  }, [])

  const unlockScrolling = useCallback(() => {
    document.documentElement.style.overflow = "visible";
    document.body.style.overflow = "visible";
  }, [])

  useEffect(() => {
    if (condition === undefined) return

    if (condition) lockScrolling(); else unlockScrolling()
  }, [condition, lockScrolling, unlockScrolling])

  return { lockScrolling, unlockScrolling }
}