import { createPortal } from "react-dom"
import { useEffect, useState } from "react"

export default function BodyPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setTimeout(() => setMounted(true),0)
  }, [])

  if (!mounted) return null
  return createPortal(children, document.body)
}