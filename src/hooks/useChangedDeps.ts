import { useEffect, useMemo, useRef, useState } from "react"

function arraysEqual<T>(a: readonly T[] | null | undefined, b: readonly T[] | null | undefined) {
  if (a === b) return true
  if (!a || !b) return false
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false
  }
  return true
}

export default function useChangedDeps<T extends Record<string, unknown>>(deps: T) {
  const prevRef = useRef<T | null>(null)
  const prevKeysRef = useRef<string | null>(null)

  const [changed, setChanged] = useState<(keyof T)[] | null>(null)

  const keys = useMemo(() => {
    return Object.keys(deps) as (keyof T)[]
  }, [deps])

  const values = keys.map(k => deps[k])

  useEffect(() => {
    const keySig = keys.join("|")

    // If the key shape changed since last run, reset our baseline.
    if (prevKeysRef.current !== null && prevKeysRef.current !== keySig) {
      prevRef.current = null
      setTimeout(() => setChanged(prev => (prev === null ? prev : null)), 0)
    }

    prevKeysRef.current = keySig

    const prev = prevRef.current
    if (!prev) {
      // Establish baseline; no changes yet.
      setTimeout(() =>
        setChanged(prevState => (prevState === null ? prevState : null)), 0
      )
      prevRef.current = deps
      return
    }

    const changedKeys = keys.filter(k => prev[k] !== deps[k])

    // Guard state updates so we don't update with an "equivalent" array.
    setChanged(prevState => {
      // Keep `null` only for the initial "not computed" state.
      const nextState = changedKeys
      if (prevState === null) return nextState
      return arraysEqual(prevState, nextState) ? prevState : nextState
    })

    prevRef.current = deps
  }, [values, deps, keys])

  return changed
}