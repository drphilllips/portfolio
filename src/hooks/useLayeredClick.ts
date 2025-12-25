

export default function useLayeredClick() {

  const clickThrough = (e: React.MouseEvent) => {
    // Prevent current handler from also doing work if you want
    e.stopPropagation()

    const x = e.clientX
    const y = e.clientY

    // Temporarily disable pointer events on the current target so hit-test finds what's under it
    const el = e.currentTarget as HTMLElement
    const prev = el.style.pointerEvents
    el.style.pointerEvents = "none"

    const underneath = document.elementFromPoint(x, y) as HTMLElement | null

    // Restore
    el.style.pointerEvents = prev

    // Now "forward" the click
    underneath?.click()
  }

  return { clickThrough }
}